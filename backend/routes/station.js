const express = require('express');

// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    db.station.findAll()
      .then((result) => {
        res.json(result);
      });
  });

  router.get('/:id', (req, res) => {
    db.station.findByPk(req.params.id)
      .then((result) => {
        res.json(result);
      });
  });

  return router;
}
