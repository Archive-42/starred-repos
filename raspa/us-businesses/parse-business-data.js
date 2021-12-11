const { Index, Document, Worker } = require("flexsearch");
const { createArrayCsvWriter } = require("csv-writer");
const business = require("./storage/business.json");

const notSoleProprietorship =
  /.+ ((?:company|co|corporation|corp|incorporated|inc)(?:\.|\b)| (?:limited|liability|partnership|company|[lpc. ]){2,7}(?:\b|\W))/gim;

function getDoltBusinessType(btype) {
  if (btype.includes("Partnership")) {
    return "PARTNERSHIP";
  }
  if (btype.includes("Trade Name")) {
    return "DBA";
  }
  if (btype.includes("Cooperative")) {
    return "COOP";
  }
  if (btype.includes("Nonprofit")) {
    return "NONPROFIT";
  }
  if (btype.includes("Limited Liability Company")) {
    return "LLC";
  }
  if (btype.includes("Real Estate Investment Trust")) {
    return "TRUST";
  }
  return "CORPORATION";
}

async function main() {
  const foreignIndex = new Index({
    preset: "match",
    tokenize: "strict",
    language: "en",
    charset: "latin:simple",
  });
  const foreignMap = new Map();

  for (const biz of business) {
    const [name, btype] = biz.TITLE;
    if (btype.toUpperCase().includes("FOREIGN")) {
      foreignIndex.add(`${biz.ID}`, name);
      foreignMap.set(`${biz.ID}`, name);
    }
  }

  const domesticOnly = business.filter((b) => {
    const [name, btype] = b.TITLE;
    if (btype === "Trade Name") {
      const match = foreignIndex.search(name).map((k) => foreignMap.get(k));
      if (match.length) return false;
    }
    return !["OUT-OF-STATE", "FOREIGN"].includes(btype.toUpperCase());
  });

  const { typeMap, bizMap } = domesticOnly.reduce(
    (acc, b) => {
      const [name, btype] = b.TITLE;
      const bizType = getDoltBusinessType(btype);

      acc.typeMap[bizType].add(btype);
      acc.bizMap[bizType].add([name, bizType, "ND", b.RECORD_NUM].join("#!!"));

      return acc;
    },
    {
      typeMap: {
        COOP: new Set(),
        CORPORATION: new Set(),
        DBA: new Set(),
        LLC: new Set(),
        NONPROFIT: new Set(),
        PARTNERSHIP: new Set(),
        "SOLE PROPRIETORSHIP": new Set(),
        TRUST: new Set(),
      },
      bizMap: {
        COOP: new Set(),
        CORPORATION: new Set(),
        DBA: new Set(),
        LLC: new Set(),
        NONPROFIT: new Set(),
        PARTNERSHIP: new Set(),
        "SOLE PROPRIETORSHIP": new Set(),
        TRUST: new Set(),
      },
    }
  );

  for (const [bizType, records] of Object.entries(bizMap)) {
    const csvWriter = createArrayCsvWriter({
      header: ["name", "business_type", "state_registered", "filing_number"],
      path: `out/business-ND-${bizType.replace(/\s/g, "_")}.csv`,
      alwaysQuote: true,
    });

    await csvWriter.writeRecords(
      [...records.values()].map((b) => b.split("#!!"))
    );
  }
}

main();

// console.dir(maps.typeMap, { depth: 2 });
// console.dir([...foreignOnly]);

// const bizMap = Object.entries(maps.bizMap)
//   .map(([key, val]) => ({ [key]: [...val] }))
//   .reduce((a, t) => ({ ...a, ...t }), {});
