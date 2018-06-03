const knex = require('./knex');

module.exports = {
  getAllCountryCodes() {
    return knex('country')
      .select()
      .orderBy('alpha3', 'asc');
  },
  getAllPlayers() {
    return knex('player')
      .select(
        'player.id',
        'player.name',
        'country.alpha3 as nationality3',
        'country.alpha2 as nationality2',
        'player.winnings',
        'player.imgSrc'
      )
      .join('country', 'player.nationality', '=', 'country.id')
      .orderBy('winnings', 'desc');
  },
  getPlayerById(playerId) {
    return knex('player')
      .select(
        'player.id',
        'player.name',
        'country.alpha3 as nationality3',
        'country.alpha2 as nationality2',
        'player.winnings',
        'player.imgSrc'
      )
      .join('country', 'player.nationality', '=', 'country.id')
      .where('player.id', '=', playerId);
  },
  addPlayer(playerInfo) {
    return knex('player')
      .insert(playerInfo)
      .returning('id');
  },
  deletePlayerById(playerId) {
    return knex('player')
      .del()
      .where('player.id', '=', playerId);
  },
  updatePlayerById(body) {
    return knex('player')
      .update(body)
      .where('player.id', '=', body.id);
  }
};
