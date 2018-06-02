exports.up = (knex, Promise) =>
  knex.schema
    .createTable('country', (table) => {
      table.increments();
      table.string('alpha3');
    })
    .then(() =>
      knex.schema.createTable('player', (table) => {
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('name');
        table.integer('nationality').references('country.id');
        table.integer('winnings');
        table.text('imgSrc');
      }));

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists('player').then(() => knex.schema.dropTableIfExists('country'));
