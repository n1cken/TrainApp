
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
    const { timetableArrivalId, email, timetableDepartureId } = req.body

    const OG = await db.station.findOne({ where: { id: timetableDepartureId } })
    if (OG === null)
      return res.status(404).end("From staion not found")

    const DN = await db.station.findOne({ where: { id: timetableArrivalId } })
    if (DN === null)
      return res.status(404).end("Destination station not found")


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
          user: 'scriptensjavavagarbooking@gmail.com',
          pass: 'Scripten!#1'
        }
      });

      var mailOptions = {
        from: 'scriptensjavavagarbooking@gmail.com',
        to: `${email}`,
        subject: 'Booking',
        text: `Thanks for booking with Scriptens Javavägar! Down below is your reciept: \n
        Booking Id: ${bookId} \n
        From: ${OG.name}\n
        To: ${DN.name}
        `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.json(createBooking)
    } catch (err) {
      console.log(err)
      console.log("\n" + DN.id + "\n")
      return res.status(500).json(err)
    }

  })

  return router;
}
