exports.up = function (knex) {
  return knex.schema.createTable("items", (tbl) => {
    tbl.increments("item_id");
    tbl.string("item_name").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
