const express = require('express');
const db = require('../../../db/api');

const router = express.Router();

router.get('/players', (req, res) =>
  db.getAllPlayers().then((data) => {
    res.send(data);
  }));

router.post('/player', (req, res) =>
  db.addPlayer(req.body).then((data) => {
    res.send(data);
  }));

router.get('/player/:id', (req, res) =>
  db.getPlayerById(req.params.id).then((data) => {
    res.send(data[0]);
  }));

router.put('/player/:id', (req, res) =>
  db.updatePlayerById(req.body).then(() => {
    res.send();
  }));

router.delete('/player/:id', (req, res) =>
  db.deletePlayerById(req.params.id).then(() => {
    res.send();
  }));

module.exports = router;
