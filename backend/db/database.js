const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

var db = {};

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../database/traindb.sqlite3",
  dialectOptions: {
  }
});

fs.readdirSync(
  path.join(__dirname, 'models'))
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(`${path.join(__dirname, 'models', file)}`)(sequelize, DataTypes);
    db[model.name] = model;
  })

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
