const express = require('express');

const router = express.Router();

//connect to db

router.get('/', (req, res) => {
  res.send('Hello World!')

  /**
   * <REQUEST>
  <LOGIN authenticationkey="{	320718ba25b94e40b84c6e74d51f8bf8}" />
  <QUERY objecttype="TrainMessage" schemaversion="1.3">
    <FILTER>
      <EQ name="AffectedLocation" value="Cst" />
    </FILTER>
    <INCLUDE>StartDateTime</INCLUDE>
    <INCLUDE>LastUpdateDateTime</INCLUDE>
    <INCLUDE>ExternalDescription</INCLUDE>
    <INCLUDE>ReasonCodeText</INCLUDE>
  </QUERY>
</REQUEST>
   */
  // fetch data from trafikverket

  //insert data into local array

  // prepare insert statement, only push data we want 

  //push it into db
});

module.exports = router;