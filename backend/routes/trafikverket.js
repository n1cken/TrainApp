import { Router } from 'express';
import driver from 'better-sqlite3';

const router = Router();

//connect to db
const db = driver('../database/traindb.sqlite3');

router.get('/getDepartures', (req, res) => {

  let getTravels = db.prepare(`
  SELECT *
  FROM trainDepartures
  `).all();

  res.send(getTravels)

});


router.get('/getBookedSeats/:id', (req, res) => {

  let getSeats = db.prepare(`
  SELECT *
  FROM bookedSeats
  WHERE travelId = ${req.params.id}
  `).all();

  res.send(getSeats)

});

router.get('/get/:origin/:destination/:date/', (req, res) => {
  let travel = db.prepare(`
  SELECT *
  FROM trainDepartures
  WHERE date = :date
  AND origin = :origin
  AND destination = :destination
  `).all({
    date: req.params.date, origin: decodeURI(req.params.origin), destination: decodeURI(req.params.destination)
  });

  res.send(travel);
});


export default router;