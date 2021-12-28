import { } from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 3000;

import routes from './routes/index.js';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/station', routes.station)
app.use('/trafik', routes.trafikverket)

app.listen(port, () => console.log(`Listening on port ${port}`));
