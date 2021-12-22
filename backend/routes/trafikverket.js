const express = require('express');

const router = express.Router();

//connect to db

router.get('/', (req, res) => {
  res.send('Hello World!')

  // fetch data from trafikverket

  //insert data into local array

  // prepare insert statement, only push data we want 

  //push it into db
});

module.exports = router;