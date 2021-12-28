const station = require('./station.js');

function InitRoutes(app, db) {
  app.use('/station', station(db))
}

module.exports = {
  InitRoutes
}
