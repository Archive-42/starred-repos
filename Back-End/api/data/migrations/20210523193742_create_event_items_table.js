exports.up = function (knex) {
  return knex.schema.createTable("event_items", (tbl) => {
    tbl.increments("event_item_id");
    tbl
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("event_id")
      .inTable("events")
      .onDelete("CASCADE");
    tbl.string("item_name").notNullable();
    tbl
      .uuid("user_id")
      .unsigned()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  // await knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("event_items");
};
