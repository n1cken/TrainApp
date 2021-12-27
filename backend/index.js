const settings = require('./settings.json');
const path = require('path');

const express = require('express');
const cors = require('cors')
const app = express();

const trafikverketRoutes = require('./routes/trafikverket');

app.use(cors());
app.use('/departures', trafikverketRoutes);
app.use(express.json({ limit: '100MB' }));

app.listen(settings.port,
  () => console.log(
    'Listening on http://localhost:' + settings.port
  ));

const driver = require('better-sqlite3');
const { appendFile } = require('fs');
const db = driver(path.join('../',
  'database', settings.dbName));

let getStation = db.prepare(`
  SELECT *
  FROM station
`).all();

app.get('/', (req, res) => {
  res.send(getStation)
})