const express = require('express');
const fetch = require('node-fetch')

const router = express.Router();

//connect to db

router.get('/', async (req, res) => {
  const response = await fetch('https://api.trafikinfo.trafikverket.se/v2/data.json',{
    method:'POST',
    body:`<REQUEST>
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
    </QUERY>
</REQUEST>`
  });
  const body = await response.json();
  res.send(body.RESPONSE.RESULT[0].TrainAnnouncement[2]);
  // fetch data from trafikverket



  //insert data into local array

  // prepare insert statement, only push data we want 

  //push it into db
});

module.exports = router;