
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res) => {

    //UID creator
    var uniqueId = function () {
      var letters = "123456789";
      var Id = "";
      for (var i = 0; i < 5; i++) {
        Id += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return Id;
    };

    //Query
    const { timetableArrivalId, email, timetableDepartureId, routeIdentity } = req.body

    const OG = await db.station.findOne({ where: { name: timetableDepartureId } })
    if (OG === null)
      return res.status(404).end("From staion not found")

    const DN = await db.station.findOne({ where: { name: timetableArrivalId } })
    if (DN === null)
      return res.status(404).end("Destination station not found")

    // we have route -> trainid: wagon -> trainid: seat -> wagon
    const trainquery = await db.route.findOne({ where: { id: routeIdentity } })
    const trainIdentity = trainquery.trainId
    let wagonsConnectedToTrain = []
    let seatsInTrain = []
    console.log(trainIdentity)
    try {
      wagonsConnectedToTrain = await db.wagon.findAll({
        where: { trainId: trainIdentity }
      })
    } catch (e) {
      console.log(e)
    }
    await wagonsConnectedToTrain.map(element => {
      db.seat.findAll(
        {
          where: {
            wagonId: element.id
          }
        }
      ).then((result) => {
        seatsInTrain.push(result),
          result.forEach(element => {
            console.log(element.id)
          });
      })
        .catch((e) => console.log(e))
    })

    try {
      const createBooking = await db.booking.create({
        id: uniqueId(),
        timetableArrivalId: OG.id,
        email,
        timetableDepartureId: DN.id
      });

      res.send("Booking Created");
      return res.json(createBooking)

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  })

  return router;
}
