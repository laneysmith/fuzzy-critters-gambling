exports.seed = (knex, Promise) => {
  // return knex.raw('TRUNCATE TABLE player, country RESTART IDENTITY CASCADE;');

  return knex('player')
    .del()
    .then(() => knex('country').del())
    .then(countries)
    .then(players);

  function countries() {
    return Promise.join(
      knex('country')
        .insert({
          alpha3: 'DEU'
        })
        .returning('id'),
      knex('country')
        .insert({
          alpha3: 'ITA'
        })
        .returning('id'),
      knex('country')
        .insert({
          alpha3: 'USA'
        })
        .returning('id'),
      knex('country')
        .insert({
          alpha3: 'KEN'
        })
        .returning('id')
    );
  }

  function players(ids) {
    const germanyId = ids[0][0];
    const italyId = ids[1][0];
    const unitedStatesId = ids[2][0];
    const kenyaId = ids[3][0];
    return Promise.join(
      knex('player').insert({
        name: 'Unsinkable Sam',
        winnings: 133000000,
        nationality: germanyId,
        imgSrc: 'https://usercontent2.hubstatic.com/14023291.jpg'
      }),
      knex('player').insert({
        name: 'Figaro',
        winnings: 290000000,
        nationality: italyId,
        imgSrc: 'http://www.cinemacats.com/wp-content/uploads/movies/pinocchio04.jpg'
      }),
      knex('player').insert({
        name: 'Stimpson J. Cat',
        winnings: 12000000,
        nationality: unitedStatesId,
        imgSrc: 'http://renandstimpy.net/wp-content/uploads/2013/05/character_stimpy.jpg'
      }),
      knex('player').insert({
        name: 'Simba',
        winnings: 346000000,
        nationality: kenyaId,
        imgSrc: 'https://ohmy.disney.com/wp-content/uploads/2014/04/lion_king_simba_flower.jpg'
      })
    );
  }
};
