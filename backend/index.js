require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

const { InitRoutes } = require('./routes/index.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
InitRoutes(app)

app.listen(port, () => console.log(`Listening on port ${port}`));
