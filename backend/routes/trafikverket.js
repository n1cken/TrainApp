const express = require('express');
const fetch = require('node-fetch')

const settings = require('../settings.json');
const path = require('path');

const router = express.Router();


const driver = require('better-sqlite3');
const { appendFile } = require('fs');
const db = driver(path.join('../',
      'database', settings.dbName));

router.get('/', async (req, res) => {
      const response = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json', {
            method: 'POST',
            body: `<REQUEST>
    <LOGIN authenticationkey="320718ba25b94e40b84c6e74d51f8bf8" />
    <QUERY objecttype="TrainAnnouncement" schemaversion="1.3" orderby="AdvertisedTimeAtLocation">
          <FILTER>
                <AND>
                      <EQ name="ActivityType" value="Avgang" />
                      <EQ name="LocationSignature" value="Cst" />
                      <EQ name="ToLocation.LocationName" value="G" />
                      <OR>
                            <AND>
                                  <GT name="AdvertisedTimeAtLocation" value="$dateadd(-00:15:00)" />
                                  <LT name="AdvertisedTimeAtLocation" value="$dateadd(23:00:00)" />
                            </AND>
                      </OR>
                </AND>
          </FILTER>
          <INCLUDE>AdvertisedTrainIdent</INCLUDE>
          <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
          <INCLUDE>ToLocation.LocationName</INCLUDE>
          <INCLUDE>LocationSignature</INCLUDE>
    </QUERY>
</REQUEST>`
      });
      const body = await response.json();
      const TrainAnnouncement = body.RESPONSE.RESULT[0].TrainAnnouncement
      res.send(body.RESPONSE.RESULT[0].TrainAnnouncement);
      // // fetch data from trafikverket
      // // prepare insert statement, only push data we want 

      //!!!!!! better sqlite is being difficult to work with
      // for (let i = 0; i < TrainAnnouncement.length; i++) {
      //       console.log(TrainAnnouncement[i].AdvertisedTimeAtLocation)
      //       let addStation = db.prepare(`
      //       INSERT INTO trainDepartures( origin, destination, date, train_index)
      //       VALUES (3,1, ${TrainAnnouncement[i].AdvertisedTimeAtLocation}
      //             ,${TrainAnnouncement[i].AdvertisedTrainIdent})
      //       `);
      //       addStation.all();
      // };
      //push it into db

});

module.exports = router;