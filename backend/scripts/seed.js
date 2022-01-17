require('dotenv').config();
const db = require('../db/database.js')

db.sequelize.sync({ force: true }).then(() => {
  console.log("Cleanded database");
  populatedata()
}).catch((err) => {
  console.log(`Failed to clean database: ${err}`)
});

function populatedata() {
  const fs = require('fs')
  const yaml = require('js-yaml')

  let data = {}

  try {
      let fileContents = fs.readFileSync('./scripts/seed-data.yml', 'utf8');
      data = yaml.load(fileContents);
  } catch (e) {
      console.log(e);
  }

  for (var k in data) {
    db[k].bulkCreate(data[k]).then(() => {
      console.log(`Records created data created.`)
    }).catch((err) => {
      console.log(`Failed to create records`)
      console.log(err)
    })
  }
}

