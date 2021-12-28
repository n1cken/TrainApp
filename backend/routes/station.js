const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    db.station.findAll().then((result) => res.json(result))
  });

  // TODO: Error handling
  router.get('/:id', (req, res) => {
    res.send("ID");
  });

  return router;
}
