const express = require('express');

// TODO: Error handling
module.exports = (db) => {
  const router = express.Router();

  router.get('/', (req, res) => {

    let queries = req.query
    if (queries.routeId === undefined)
      return res.status(404).end("Please specify query")

    db.timetable.findAll({
      where: {
        routeId: queries.routeId
      }
    })
      .then((result) => {
        res.json(result);
        console.log(result)
      }).catch((e) => console.log(e))
  })

  return router;
}
