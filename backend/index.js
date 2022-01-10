require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { populatedata } = require('./scripts/seed.js')

const app = express();

const port = process.env.PORT || 3000;

const { InitRoutes } = require('./routes/index.js');
const db = require('./db/database.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
db.sequelize.sync({ force: false }).then(() => {
  InitRoutes(app, db)
  populatedata();
  
  app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch((err) => {
  console.log(err)
});
