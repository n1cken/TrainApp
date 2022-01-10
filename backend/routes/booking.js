const express = require('express');


// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send("hello world")
    // post what route the user wants to book
    // search if seats are all booked or not
    //get the user a seat id for specific trainid and routeid, generate a bookingid,
    // email user the information
  });

  router.get('/routeId=:id', async (req, res) => {
    const routeInfo = await db.route.findByPk(req.params.id);
    res.send(routeInfo);
  })

  return router;
}