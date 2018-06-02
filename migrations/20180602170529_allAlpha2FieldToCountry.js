exports.up = (knex, Promise) =>
  knex.schema.table('country', (table) => {
    table.string('alpha2');
  });

exports.down = (knex, Promise) =>
  knex.schema.table('country', (table) => {
    table.dropColumn('alpha2');
  });
