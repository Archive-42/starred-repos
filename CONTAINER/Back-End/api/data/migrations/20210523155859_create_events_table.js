exports.up = async function (knex) {
  // await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("events", (tbl) => {
    tbl.increments("event_id");
    tbl.string("event_name", 128).notNullable().unique();
    tbl.string("event_date", 128).notNullable();
    tbl.string("event_time", 128).notNullable();
    tbl.string("event_location", 128).notNullable();
    tbl
      .uuid("owner_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  // await knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("events");
};
