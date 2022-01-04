const express = require('express');

// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('working')
  })

  router.get('/:origin/:destination', async (req, res) => {
    const UserOrigin = decodeURIComponent(req.params.origin);
    const UserDestination = decodeURIComponent(req.params.destination);
    const OG = await db.station.findOne({ where: { name: UserOrigin } });
    const DN = await db.station.findOne({ where: { name: UserDestination } });
    res.json(DN.id)
  });

  return router;
}
