require("dotenv").config();

const pg = require("pg");

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DEV_DATABASE_URL,
    migrations: { directory: "./api/data/migrations" },
    seeds: { directory: "./api/data/seeds" },
  },
  testing: {
    client: "pg",
    migrations: { directory: "./api/data/migrations" },
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    client: "pg",
    migrations: { directory: "./api/data/migrations" },
    seeds: { directory: "./api/data/seeds" },
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
  },
};
