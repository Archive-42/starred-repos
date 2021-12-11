const db = require("../data/db-config");

const findAll = () => {
  return db("items");
};

const getById = (item_id) => {
  return db("items").where({ item_id }).first();
};

const add = async (item) => {
  const [item_id] = await db("items").insert(item);
  return await getById(item_id);
};

module.exports = { findAll, getById, add };
