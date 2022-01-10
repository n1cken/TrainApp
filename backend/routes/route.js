const express = require('express');
const {
    Op, Sequelize
} = require("sequelize");
// TODO: Error handling
module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        let OgFilter = []
        let suitableTravels = []
        let queries = req.query
        if (queries.from === undefined || queries.dest === undefined || queries.date === undefined)
            return res.status(404).end("Please specify query")


        const OG = await db.station.findByPk(queries.from)
        if (OG === null)
            return res.status(404).end("From staion not found")

        const DN = await db.station.findByPk(queries.dest)
        if (DN === null)
            return res.status(404).end("Destination station not found")


        const existingRoutesOnDate = await db.timetable.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('routeId')), 'routeId'],
            ],
            where: {
                [Op.and]: [{
                    departure: { [Op.gte]: `${queries.date}T00:00:00Z` }

                }, {
                    departure: { [Op.lte]: `${queries.date}T23:59:59Z` }
                }]
            }
        })

        await Promise.all(existingRoutesOnDate.map(async route => {
            await db.timetable.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('routeId')), 'routeId',],
                    "departure"
                    , "stationId"
                ],
                where: {
                    [Op.and]: [{
                        routeId: route.routeId,
                        stationId: OG.id
                    }]
                }
            }).then(async (ogStation) => {
                console.log(ogStation)
                if (ogStation.length > 0) {
                    await db.timetable.findAll({
                        attributes: [
                            [Sequelize.fn('DISTINCT', Sequelize.col('routeId')), 'routeId'],
                        ],
                        where: {
                            [Op.and]: [{
                                routeId: ogStation[0].dataValues.routeId,
                                stationId: DN.id,
                                arrival: { [Op.gte]: ogStation[0].dataValues.departure }
                            }]
                        }
                    }).then((result) => {
                        if (result.length > 0) {
                            suitableTravels.push(result[0].dataValues.routeId)
                        }
                    }).then(() => console.log(suitableTravels))
                }
            })
        }));

        let DNrouteArray
        let OGrouteArray
        let MatchRouteArray = []
        await Promise.all(suitableTravels.map(async element => {
            OGrouteArray = (await db.timetable.findAll({ where: { [Op.and]: [{ routeId: element }, { stationId: OG.id }] } }))
            DNrouteArray = (await db.timetable.findAll({ where: { [Op.and]: [{ routeId: element }, { stationId: DN.id }] } }))
        }))
        console.log(OGrouteArray[1].id)
        for (let i = 0; i < OGrouteArray.length; i++) {
            MatchRouteArray.push({
                routeId: OGrouteArray[i].id,
                from: OGrouteArray[i].stationId,
                to: DNrouteArray[i].stationId,
                departure: OGrouteArray[0].departure,
                arrival: DNrouteArray[i].arrival
            })
        }
        res.send(MatchRouteArray);
    });
    return router;
}
