
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
  
  var seatAvailability = async function (routeIdentity,ticketAmount) {
    let maximumCapacityForTrain = []
    let seatIds = []
    let multipleSeats = []
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
            routeId: null,
            occupied: false
          })
      }
    }

    for await (const seat of seatIds) {
      await db.ticket.findOne({ where: { seatId: seat.id, routeId: routeIdentity } })
        .then((result) =>
        {
          if (result != null)
          {
            for (const seat of seatIds){
              if (result.seatId === seat.id){
                seat.occupied = true;
                seat.routeId = result.routeId
              }
          }
          } else {
        }}
      )
    }

    for (var singleSeat = 0; singleSeat < seatIds.length; singleSeat++){
      if (seatIds[singleSeat].occupied === false && routeIdentity != seatIds[singleSeat].routeId) {
        seatHolder = { id: seatIds[singleSeat].id, seatNumber: seatIds[singleSeat].number, occupied: seatIds[singleSeat].occupied, wagonId: seatIds[singleSeat].wagon }
        multipleSeats.push(seatHolder)
      }
    }
    let userWantedSeats = []
    for (let i = 0; i < ticketAmount; i++){
      if (multipleSeats[i]) {
              userWantedSeats.push(multipleSeats[i])
      }
    }


            return userWantedSeats
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
    const { timetableArrivalId, email, timetableDepartureId, departure, arrival, routeIdentity,ticketAmount} = req.body

    const OG = await db.station.findOne({ where: { id: timetableDepartureId } })
    if (OG === null)
      return res.status(404).end("From staion not found")

    const DN = await db.station.findOne({ where: { id: timetableArrivalId } })
    if (DN === null)
      return res.status(404).end("Destination station not found")


    try {    
      let seat = await (seatAvailability(routeIdentity,ticketAmount))
      var bookId = uniqueId()
      if (ticketAmount <= seat.length && seat[0]) {
        const createBooking = await db.booking.create({
        id: bookId,
        timetableArrivalId: OG.id,
        email,
        timetableDepartureId: DN.id
        });

        let tickets = []
        for (let i = 0; i < seat.length; i++){
          console.log(routeIdentity)
      tickets.push({
        price: 100,
        bookingId: bookId,
        seatId: seat[i].id,
        routeId: routeIdentity
      })  
        }
  
        
        await db.ticket.bulkCreate(tickets, {
        })
      
      var nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWD,
        }
      });
      
      let content =  `Thanks for booking with Scriptens Javavägar! Please see details below: \n
        Booking Id: ${bookId} \n
        From: ${OG.name} at ${departure.replace("T", " ")}\n
        To: ${DN.name} at ${arrival.replace("T", " ")}\n
        routeId: ${routeIdentity}\n`


        for (let i = 0; i < seat.length; i++){
          content += `Wagon: ${seat[i].wagonId} Seat: ${seat[i].seatNumber}\n`
        }

      var mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'Booking',
        text: `${content}`
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
