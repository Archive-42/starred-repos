exports.up = async function (knex) {
  // await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("event_guests", (tbl) => {
    tbl
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("event_id")
      .inTable("events")
      .onDelete("CASCADE");
    tbl
      .uuid("guest_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    tbl.string("response").notNullable().defaultTo("Has not responded");
  });
};

exports.down = async function (knex) {
  // await knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("event_guests");
};
