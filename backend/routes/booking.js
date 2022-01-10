
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
    const { routeId, timetableArrivalId, timetableDepartureId } = req.body
    try {
      const createBooking = await db.booking.create({
        id: uniqueId(),
        timetableArrivalId,
        email,
        timetableDepartureId
      });

      return res.json(createBooking)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

    res.send("Booking Created");
  })

  return router;
}
