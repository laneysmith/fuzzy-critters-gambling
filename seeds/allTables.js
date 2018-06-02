const countriesData = require('../data/countries');
const playersData = require('../data/players');

exports.seed = (knex, Promise) =>
  knex
    .raw('TRUNCATE TABLE player, country RESTART IDENTITY CASCADE;')
    .then(() => knex('country').insert(countriesData))
    .then(() => {
      const playerPromises = [];
      playersData.forEach((player) => {
        const { nationality } = player;
        playerPromises.push(createProduct(knex, player, nationality));
      });
      return Promise.all(playerPromises);
    });

const createProduct = (knex, player, nationality) =>
  knex('country')
    .where('alpha3', nationality)
    .first()
    .then(nationalityRecord =>
      knex('player').insert({
        name: player.name,
        winnings: player.winnings,
        imgSrc: player.imgSrc,
        nationality: nationalityRecord.id
      }));
