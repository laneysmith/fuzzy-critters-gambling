const express = require('express');
const db = require('../../../db/api');

const router = express.Router();

router.get('/country', (req, res) =>
  db.getAllCountryCodes().then((data) => {
    res.send(data);
  }));

module.exports = router;
