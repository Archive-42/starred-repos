const db = require("../data/db-config");

const findBy = (filter) => {
  return db("users").where(filter).first();
};

const add = async (user) => {
  const [{ user_id }] = await db("users").insert(user, ["user_id"]);

  return await findBy({ user_id });
};

module.exports = { findBy, add };
