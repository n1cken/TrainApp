const station = require('./station.js');

function InitRoutes(app) {
  app.use('/station', station)
}

module.exports = {
  InitRoutes
}
