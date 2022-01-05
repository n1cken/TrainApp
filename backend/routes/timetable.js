const express = require('express');
const { Op } = require("sequelize");
// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('working')
  })

  router.get('/:origin/:destination/:date', async (req, res) => {

    const FinalizedTimetable = []
    //translate stations into db corresponding id
    const UserOrigin = decodeURIComponent(req.params.origin);
    const UserDestination = decodeURIComponent(req.params.destination);
    const OG = await db.station.findOne({ where: { name: UserOrigin } });
    const DN = await db.station.findOne({ where: { name: UserDestination } });

    const result = await db.timetable.findAll({ where: { [Op.or]: [{ stationId: OG.id }, { stationId: DN.id }], [Op.and]: [{ [Op.or]: [{ departure: { [Op.lte]: `${req.params.date}T23:59:59Z` }, departure: { [Op.gte]: `${req.params.date}T00:00:01Z` } }, { arrival: { [Op.lte]: `${req.params.date}T23:59:59Z` }, arrival: { [Op.gte]: `${req.params.date}T00:00:01Z` } }] }] } })

    for (let i = 0; i < result.length; i++) {
      const localArrayMatch = FinalizedTimetable.filter(singleElement => singleElement.routeId == result[i].routeId)
      if (localArrayMatch.length < 1) {
        const match = result.filter(timetable => timetable.routeId == result[i].routeId)
        if (match.length == 2) {
          console.log(match.length)
          if (match[0].routeId == DN) {
            FinalizedTimetable.push({ "departure": match[1].departure, "arrival": match[0].arrival, "From": UserOrigin, "To": UserDestination, "routeId": result[i].routeId })
          } else {
            FinalizedTimetable.push({ "departure": match[0].departure, "arrival": match[1].arrival, "From": UserOrigin, "To": UserDestination, "routeId": result[i].routeId })
          }
        }

      } else {
      }
    }

    console.log(FinalizedTimetable)
    // take one single result routeId
    // check if element exists in Local Array
    // if Not ///////////////////////////
    // find other pair in result
    //if yes ////////////////////////////
    //Break and move on

    res.send(FinalizedTimetable)
    // use id to find in timetable
  });

  return router;
}
