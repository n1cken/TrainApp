
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
    let seatIds = []
    let seatHolder;
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
        seatIds.push(
          {
            id: seat[i].id,
            wagon: seat[i].wagonId,
            number: seat[i].number,
            occupied: false
          })
      }
    }

    for await (const seat of seatIds) {
      await db.ticket.findOne({ where: { seatId: seat.id } })
        .then((result) =>
        {
          if (result != null)
          {
            for (const seat of seatIds){
              if (result.seatId === seat.id){
                seat.occupied = true;
              }
              console.log("seat: ", seat)
          }
          } else {
            console.log("couldn't find seat")
        }}
      )
    }

    for (var singleSeat = 0; singleSeat < seatIds.length; singleSeat++){
      if (seatIds[singleSeat].occupied === false) {
        seatHolder = { id: seatIds[singleSeat].id, seatNumber: seatIds[singleSeat].number, occupied: seatIds[singleSeat].occupied, wagonId: seatIds[singleSeat].wagon}
              break;
      } else {
        seatHolder = null
      }
    }
            return seatHolder
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


    try {    
    let seat = await (seatAvailability(routeIdentity))
      if (seat != null){
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
        seatId: seat.id
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
        To: ${DN.name} at ${arrival.replace("T", " ")}\n
        wagon: ${seat.wagonId} seat: ${seat.seatNumber}
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
      } else {
        return res.json("All seats have been booked!")
    }
      
    } catch (err) {
      console.log(err)
      console.log("\n" + DN.id + "\n")
      return res.status(500).json(err)
    }

  })

  return router;
}
