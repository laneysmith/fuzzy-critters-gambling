const express = require('express');

const data = [
  {
    id: 44,
    name: 'George Washington',
    winnings: 2900000,
    nationality: 'GBR',
    imgSrc: 'https://cataas.com/cat?width=80&height=80'
  },
  {
    id: 9,
    name: 'Kitten Cat',
    winnings: 1800000,
    nationality: 'USA',
    imgSrc: 'https://cataas.com/cat?width=80&height=80'
  },
  {
    id: 12,
    name: 'Hank the Dog',
    winnings: 200000,
    nationality: 'USA',
    imgSrc: 'https://cataas.com/cat?width=80&height=80'
  }
];

const router = express.Router();
router.get('/players', (req, res) => res.send({ data }));
router.get('/player/:id', (req, res) => res.send({ data: data[0] }));

module.exports = router;
