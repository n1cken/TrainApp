
const express = require('express');

module.exports = (db) => {
  const router = express.Router();
/* test post body
{
    "email":"biyel59065@unigeol.com",
    "timetableArrivalId": "1",
    "timetableDepartureId": "3",
    "routeIdentity": 4,
    "departure": "2022-01-28T17:00:00.000 +00:00Z",
    "arrival": "2022-01-29T00:15:00.000 +00:00Z"
}*/
  /*
  Async function return promise - check available seats
  TODO make post body include route

  1. await Use route to find train Id
  2. await Use trainId in wagonTable to find all seats -> wagon -> train === Max capacity
  ---------
  3. await loop trough seatsIds to find if any are booked in ticket. x amount booked 
  ---------
  4. Max Capacity - x amount booked = y available seats
  5 give the user a seat of x + 1 if it doesn't reach over Max capacity
  ---------

  */
  
  var seatAvailability = async function (routeIdentity) {
    let maximumCapacityForTrain = []
    let routeIdToTrainId = await db.route.findOne(
      {
        where:
        {
          id: routeIdentity
        }
      })
    let trainIdToWagonSeats = await db.wagon.findAll(
      {
        where:
        {
          trainId: routeIdToTrainId.trainId
        }
      })
     for await (const element of trainIdToWagonSeats) {
       await db.seat.findAll(
         {
           where:
           {
             wagonId: element.id
           }
         })
         .then((result) => maximumCapacityForTrain.push(result))
    }
    // max seat capacity
    for await (const seat of maximumCapacityForTrain) {
      for (var i = 0; i < seat.length; i++){
        console.log(seat[i].number)
      }
      
    }
  }
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
    const { timetableArrivalId, email, timetableDepartureId, departure, arrival, routeIdentity} = req.body

    const OG = await db.station.findOne({ where: { id: timetableDepartureId } })
    if (OG === null)
      return res.status(404).end("From staion not found")

    const DN = await db.station.findOne({ where: { id: timetableArrivalId } })
    if (DN === null)
      return res.status(404).end("Destination station not found")

    seatAvailability(routeIdentity);
    try {
      var bookId = uniqueId()
      const createBooking = await db.booking.create({
        id: bookId,
        timetableArrivalId: OG.id,
        email,
        timetableDepartureId: DN.id
      });
      const createTicket = await db.ticket.create({
        price: 100,
        bookingId: bookId,
        seatId: 1
      })
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
      });
      const regex = new RegExp('[^ 0 - 9] + /g')

      var mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'Booking',
        text: `Thanks for booking with Scriptens Javavägar! Down below is your reciept: \n
        Booking Id: ${bookId} \n
        From: ${OG.name} at ${departure.replace("T", " ")}\n
        To: ${DN.name} at ${arrival.replace("T", " ")}
        `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.json("Booking Created")
    } catch (err) {
      console.log(err)
      console.log("\n" + DN.id + "\n")
      return res.status(500).json(err)
    }

  })

  return router;
}
