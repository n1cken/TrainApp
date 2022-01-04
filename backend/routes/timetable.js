const express = require('express');
const { Op } = require("sequelize");
// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('working')
  })

  router.get('/:origin/:destination/', async (req, res) => {

    //translate stations into db corresponding id
    const UserOrigin = decodeURIComponent(req.params.origin);
    const UserDestination = decodeURIComponent(req.params.destination);
    const OG = await db.station.findOne({ where: { name: UserOrigin } });
    const DN = await db.station.findOne({ where: { name: UserDestination } });

    const result = await db.timetable.findAll({ where: { [Op.or]: [{ stationId: OG.id }, { stationId: DN.id }] } })
    res.send(result)
    // use id to find in timetable
  });

  return router;
}
