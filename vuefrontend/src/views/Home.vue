<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
    <v-row class="my-6">
     <!--<options-box title="Wheelchair" /> 
     <options-box title="Dog" />--> 
    </v-row>

  <v-row style="display:flex; flex-wrap: wrap;" justify="center">
    <date-pick-calendar titel="AVRESA" show-current />
    <date-pick-calendar titel="RETURRESA" show-current />
  </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-btn large elevation="" color="blue" @click="searchTravels()">Sök resa</v-btn>
      </v-col>
    </v-row>


    <v-row v-if="!this.validSearch">
      <h2 v-if="this.sameStations">Vänligen välj olika stationer att resa emellan.</h2>
      <h2 v-if="this.missingStations">Vänligen fyll i stationer samt datum för din resa.</h2>
    </v-row>

    <v-row v-if="this.validSearch">
      <h2 v-if="this.validSearch"> Sökresultat </h2>
      <search-result v-for="(result, i) in results" :key="i"/>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import StopSearchbox from "../components/StopSearchbox.vue";
import DatePickCalendar from "../components/DatePickCalendar.vue";
//import OptionsBox from "../components/OptionsBox.vue";
import SearchResult from "../components/SearchResult.vue";

export default {
  name: "Home",
  components: {
    //OptionsBox,
    StopSearchbox,
    DatePickCalendar,
    SearchResult,
  },
  data: function () {
    return {
      missingStations: true,
      sameStations: false,
      validSearch: false,
      results: [],
    };
  },
  methods: {
    searchTravels() {
      //Origin or Destination is null
      if (!this.$store.state.originStation || !this.$store.state.destinationStation) {
        this.missingStations = true;
        this.sameStations = false;
        this.validSearch = false;
      }

      //Check that fields are not null.
      if (
        this.$store.state.originStation &&
        this.$store.state.destinationStation &&
        this.$store.state.chosenDepartureDate
      ) {
        //If same origin and destination
        if (this.$store.state.originStation == this.$store.state.destinationStation) {
          this.sameStations = true;
          this.missingStations = false;
          this.validSearch = false;
        }

        //Valid search
        if (this.$store.state.originStation != this.$store.state.destinationStation) {
          this.sameStations = false;
          this.missingStations = false;
          this.validSearch = true;
        }

        if (this.validSearch) {
          fetch("http://localhost:3000/station")
            .then((res) => res.json())
            .then((data) => (this.resultData = data))
            .then(() => {
              for (var i = 0; i < this.resultData.length; i++) {
                this.results.push(this.resultData[i]);
              }
            })
            .catch((err) => console.log(err.message));
        }
    }
  },
}
}
</script>
