const fs = require('fs');
const path = require('path');

function InitRoutes(app, db) {
  fs.readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js')
    }).forEach(file => {
      const handler = require(`${path.join(__dirname, file)}`)(db)
      app.use(`/${file.replace(/\.[^/.]+$/, "")}`, handler)
    })
}

module.exports = {
  InitRoutes
}
