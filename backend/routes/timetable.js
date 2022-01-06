const express = require('express');
const { Op } = require("sequelize");
// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    let queries = req.query
    if (queries.from === undefined || queries.dest === undefined || queries.date === undefined)
      return res.status(404).end("Please specify query")


    const OG = await db.station.findByPk(queries.from)
    if (OG === null)
        return res.status(404).end("From staion not found")

    const DN = await db.station.findByPk(queries.dest)
    if (DN === null)
        return res.status(404).end("Destination station not found")

    let FinalizedTimetable = []

const result = await db.timetable.findAll({ where: { [Op.or]: [{ stationId: OG.id }, { stationId: DN.id }], [Op.and]: [{ [Op.or]: [{ departure: { [Op.lte]: `${queries.date}T23:59:59Z` }, departure: { [Op.gte]: `${queries.date}T00:00:01Z` } }, { arrival: { [Op.lte]: `${queries.date}T23:59:59Z` }, arrival: { [Op.gte]: `${queries.date}T00:00:01Z` } }] }] } })

    for (let i = 0; i < result.length; i++) {
      const localArrayMatch = FinalizedTimetable.filter(singleElement => singleElement.routeId == result[i].routeId)
      if (localArrayMatch.length < 1) {
        const match = result.filter(timetable => timetable.routeId == result[i].routeId)
        if (match.length == 2) {
          console.log(match.length)
          if (match[0].routeId == DN) {
            FinalizedTimetable.push({ "departure": match[1].departure, "arrival": match[0].arrival, "From": OG.name, "To": DN.name, "routeId": result[i].routeId })
          } else {
            FinalizedTimetable.push({ "departure": match[0].departure, "arrival": match[1].arrival, "From": OG.name, "To": DN.name, "routeId": result[i].routeId })
          }
        }

      }
    }

    res.send(FinalizedTimetable)
  })

  return router;
}
