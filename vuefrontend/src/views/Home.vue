<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
    <v-row class="my-6">
      <!--<options-box title="Wheelchair" /> 
     <options-box title="Dog" />-->
    </v-row>

    <v-row style="display: flex; flex-wrap: wrap" justify="center">
      <date-pick-calendar titel="AVRESA" show-current />
      <date-pick-calendar titel="RETURRESA" show-current />
    </v-row>

    <v-row justify="center" style="display: flex" class="my-6">
      <v-col cols="12" sm="12" md="12"> ANTAL RESENÄRER</v-col>
      <v-btn
        medium
        fab
        elevation=""
        color="blue"
        @click="reduceAmountOfTickets()"
        style="color: white; font-size: 40px; margin-right: 10px"
        >-</v-btn
      >
      <div style="margin-top: 18px; font-size: 16px">{{ this.amountOfTickets }}</div>
      <v-btn
        medium
        fab
        elevation=""
        color="blue"
        @click="increaseAmountOfTickets()"
        style="color: white; font-size: 30px; margin-left: 10px"
        >+</v-btn
      >
    </v-row>
    <v-row justify="center" class="my-6">
      <v-btn
        style="color: white"
        x-large
        elevation=""
        color="blue"
        @click="searchTravels()"
        >Sök resa</v-btn
      >
    </v-row>

    <h2 v-if="this.sameStations">Vänligen välj olika stationer att resa emellan.</h2>

    <h2 v-if="this.missingStations">
      Vänligen fyll i stationer samt datum för din resa.
    </h2>

    <v-row v-if="this.validSearch" justify="center" class="my-3">
      <v-col cols="12" sm="12" md="12" style="background-color: black; height: 300px">
        <p class="my-4" style="color: white; font-size: 35px">SÖKRESULTAT</p>
         <p class="my-4" style="color: white; font-size: 25px"> {{ this.$store.state.chosenDepartureDate }} </p>
        <div class="my-4" style="color: white; font-size: 35px">
          {{ this.$store.state.originStation }}
          <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
          {{ this.$store.state.destinationStation }}
        </div>
      </v-col>

      <search-result v-if="this.validSearch" />
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
      amountOfTickets: 1,
    };
  },
  methods: {
    reduceAmountOfTickets() {
      if (this.amountOfTickets > 1) {
        this.amountOfTickets = this.amountOfTickets - 1;
      }
    },

    increaseAmountOfTickets() {
      this.amountOfTickets = this.amountOfTickets + 1;
    },

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
          console.log("Search valid. fetching data... ");
        }
      }
    },
  },
};
</script>
