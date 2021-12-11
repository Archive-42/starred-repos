/* eslint consistent-return: 0 */

"use strict";

const { api, data, params } = require("@serverless/cloud"); // eslint-disable-line
const isUrl = require("is-absolute-url");
const { customAlphabet } = require("nanoid");

const random = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 6);
const reservedNames = ["list"];

/*
 * Set Redirect
 */
api.put("/", async (req, res, next) => {
  try {
    console.log("Setting redirect");
    authorize(req);
    const { url } = req.body;
    const name = req.body.name || random();

    if (!isUrl(url)) {
      throw new Error(`Invalid URL: ${url}`);
    }

    if (reservedNames.includes(name)) {
      throw new Error(`This name is reserved: ${name}`);
    }

    await data.set(`redirects:${name}`, url);

    const shortUrl = getShortUrl(name, req.host);

    return res.send({ name, url, shortUrl });
  } catch (e) {
    next(e);
  }
});

/*
 * Delete Redirect
 */
api.delete("/:name", async (req, res, next) => {
  try {
    console.log("Deleting redirect");
    authorize(req);
    const { name } = req.params;

    await data.remove(`redirects:${name}`);

    const redirects = await getRedirects(req.host);

    return res.send({ redirects });
  } catch (e) {
    next(e);
  }
});

/*
 * Redirect
 */
api.get("/:name", async (req, res, next) => {
  try {
    const { name } = req.params;

    // List Redirects
    if (name === "list") {
      console.log("Listing redirects");

      authorize(req);

      const redirects = await getRedirects(req.host);

      return res.send({ redirects });
    }

    console.log("Redirecting");

    const redirectUrl = await data.get(`redirects:${name}`);

    if (!redirectUrl) {
      return res.status(404).send("Not Found");
    }

    return res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
});

// eslint-disable-next-line
api.use((err, req, res, next) => {
  // Errors are also streamed live to your terminal in dev mode.
  console.error(err.stack);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  return res.status(err.statusCode).json(error);
});

const authorize = (req) => {
  let adminPassword = req.query.adminPassword;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    adminPassword = authHeader.replace("Bearer ", "");
  }

  if (!adminPassword || adminPassword !== params.ADMIN_PASSWORD) {
    throw new Error("Unauthorized");
  }
};

const getRedirects = async (requestHost) => {
  const { items } = await data.get("redirects:*");
  return items.map((item) => {
    const name = item.key.replace("redirects:", "");
    const url = item.value;
    const shortUrl = getShortUrl(name, requestHost);

    return {
      name,
      url,
      shortUrl,
    };
  });
};

const getShortUrl = (name, requestHost) => {
  let root = `https://${requestHost}`;

  return `${root}/${name}`;
};

module.exports = api;
