exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("users", (tbl) => {
    tbl
      .uuid("user_id")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    tbl.string("username", 128).notNullable().unique();
    tbl.string("password", 128).notNullable();
  });
};

exports.down = async function (knex) {
  // await knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema.dropTableIfExists("users");
};
