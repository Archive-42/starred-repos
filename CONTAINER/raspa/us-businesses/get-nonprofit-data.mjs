import "lodash.combinations";
import _ from "lodash";
import got, { HTTPError, RequestError } from "got";
import SocksProxyAgent from "socks-proxy-agent";
import { LocalStorage } from "node-localstorage";
import HttpStatus from "http-status";

const proxies = ["127.0.0.1:1080"];

const proxyAgents = proxies.map((addr) => {
  const [host, port] = addr.split(":");
  return new SocksProxyAgent({
    timeout: 10 * 60 * 60,
    host,
    port,
  });
});
const localStorage = new LocalStorage("./storage-nonprofit", 200 * 1024 * 1024);
const { state, nonprofits } = loadData();

const defaultClient = got.extend({
  prefixUrl: "https://firststop.sos.nd.gov/",
  dnsCache: true,
  headers: {
    "user-agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0",
    accept: "*/*",
    "content-type": "application/json",
  },
});
const proxiedClient = () => {
  const proxyAgent = _.shuffle(proxyAgents).pop();
  return defaultClient.extend({
    dnsCache: true,
    http2: false,
    agent: {
      https: proxyAgent,
      http: proxyAgent,
    },
  });
};

try {
  setup();
  await main();
} finally {
  saveData();
}

async function main() {
  state.execCount = (state.execCount || 0) + 1;

  for (const [prefixIndex, prefix] of state.prefixes.entries()) {
    if (state.lastPrefixIndex && state.lastPrefixIndex > prefixIndex) {
      continue;
    }
    await searchPrefix(prefixIndex, prefix);
    state.lastPrefixIndex = prefixIndex;
  }

  state.lastPrefixIndex = 0;
  const toRetry = _.clone(state.toRetry);
  for (const prefixIndex of toRetry) {
    const prefix = state.prefixes[prefixIndex];
    if (state.lastPrefixIndex && state.lastPrefixIndex > prefixIndex) {
      continue;
    }
    await searchPrefix(prefixIndex, prefix);

    state.toRetry = state.toRetry.filter((index) => index !== prefixIndex);
    state.lastPrefixIndex = prefixIndex;
  }

  state.lastPrefixIndex = 0;
}

function getClient(isRetry) {
  if (
    isRetry ||
    (state.defaultClientAllowedAfter &&
      +new Date() < state.defaultClientAllowedAfter)
  ) {
    return proxiedClient();
  }
  return defaultClient;
}

async function searchPrefix(prefixIndex, prefix, isRetry = false) {
  console.log(
    `Searching names starting with ${prefix}... ${isRetry ? "(again)" : ""}`
  );
  try {
    const { statusCode, headers, body } = await getClient(isRetry).post(
      "api/Records/charitablesearch",
      {
        body: JSON.stringify({
          SEARCH_VALUE: prefix,
          STARTS_WITH_YN: true,
          ACTIVE_ONLY_YN: true,
        }),
        responseType: "json",
      }
    );

    if (body?.rows) {
      const rows = Object.values(body.rows);
      nonprofits.push(...rows);
      console.log(`Done! Got ${rows.length} new nonprofits.`);
    } else {
      console.log("Ooops... we got no data in this response");
      console.log("--> Request data:", { statusCode, headers });

      state.toRetry.push(prefixIndex);
    }
  } catch (e) {
    if (
      e instanceof HTTPError &&
      e.response.statusCode === HttpStatus.TOO_MANY_REQUESTS
    ) {
      const sleepDuration = +e.response.headers["retry-after"] || 2;

      if (!isRetry) {
        console.log(`Oops! Let's wait 1 second and try a proxied request...`);
        state.defaultClientAllowedAfter = +new Date() + sleepDuration * 1000;
        await sleep(1000);
        return searchPrefix(prefixIndex, prefix, true);
      }

      console.log(
        `Too many requests! Gonna sleep for ${sleepDuration} secondzZz...`
      );
      await sleep(sleepDuration * 1000);
    } else if (e instanceof RequestError) {
      console.log(`Oops! RequestError: "${e.message}". Let's retry...`);
      return searchPrefix(prefixIndex, prefix, true);
    } else {
      console.error(e);
      saveData();
      process.exit(1);
    }
  }
}
function setup() {
  process.on("SIGTERM", onSignal);
  process.on("SIGINT", onSignal);
}

function saveData() {
  localStorage.setItem("state.json", JSON.stringify(state));
  localStorage.setItem("nonprofit.json", JSON.stringify(nonprofits));
}

function loadData() {
  const savedState = localStorage.getItem("state.json");
  const savedBusiness = localStorage.getItem("nonprofit.json");
  const state = {
    toRetry: [],
    ...(savedState ? JSON.parse(savedState) : false),
  };
  const nonprofits = [];

  if (savedBusiness) {
    nonprofits.push(...JSON.parse(savedBusiness));
  }

  if (!state.prefixes) {
    state.prefixes = _("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
      .combinations(2)
      .map((v) => _.join(v, ""))
      .sort((nameA, nameB) => nameA.localeCompare(nameB))
      .push(..._.range(0, 10).map((v) => `${v}`))
      .value();
  }

  return { state, nonprofits };
}

function onSignal(signal) {
  console.warn(`received signal ${signal}, shutting down`);
  saveData();
  shutdown();
}

async function shutdown() {
  process.exit(0);
}

function sleep(timeMS) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMS);
  });
}
