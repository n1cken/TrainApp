//import {} from 'dotenv/config';
import express from 'express';
const router = express.Router();

// TODO: Make module out of database calls
import path from 'path';
import driver from 'better-sqlite3';

const db = driver(path.join( '../', 'database', process.env.DBNAME));
// TODO: End of todo

router.get('/', (req, res) => {
  let stations = db.prepare(`SELECT * FROM station`).all();
  res.send(stations);
});

// TODO: Error handling
router.get('/:id', (req, res) => {
  let stmt = db.prepare(`SELECT * FROM station WHERE id=?`);
  var station = stmt.get(req.params.id);
  res.send(station);
});

export default router;

