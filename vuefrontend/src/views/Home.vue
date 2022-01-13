<template>
  <div
    style="
      background: url(background2.jpg);
      padding-top: 30px;

      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    "
  >
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
      <v-col cols="12" sm="12" md="12" style="color: white; font-size: 18px">
        ANTAL RESENÄRER</v-col
      >
      <v-btn
        medium
        fab
        elevation="3"
        color="blue"
        @click="reduceAmountOfTickets()"
        style="color: white; font-size: 40px; margin-right: 10px"
        >-</v-btn
      >
      <div style="margin-top: 18px; font-size: 20px">
        {{ this.$store.state.chosenAmountOfTickets }}
      </div>
      <v-btn
        medium
        fab
        elevation="3"
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
        elevation="3"
        color="blue "
        @click="searchTravels()"
        :loading="fetchingResult"
        v-scroll-to="{
          el: '#resultBlackBox',
          duration: 500,
          easing: 'linear',
          offset: -200,
          force: true,
          cancelable: true,
          x: false,
          y: true,
        }"
        >Sök resa</v-btn
      >
    </v-row>

    <v-row v-if="this.validSearch" justify="center" class="py-0">
      <v-col
        cols="12"
        sm="12"
        md="12"
        style="background-color: rgb(0, 0, 0); height: 300px"
      >
        <h1
          class="my-4"
          id="resultBlackBox"
          style="color: white; font-size: 30px; padding-top: 30px"
        >
          SÖKRESULTAT
        </h1>
        <p class="my-4" style="color: white; font-size: 25px">
          {{ this.searchResultDepartureDate }}
        </p>
        <div class="my-4" style="color: white; font-size: 35px">
          {{ this.searchResultFromStation }}
          <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
          {{ this.searchResultToStation }}
        </div>
      </v-col>
    </v-row>

    <v-row v-if="!this.validSearch" justify="center" class="my-3">
      <div style="margin-bottom: 30px; font-family: Lucida Sans; border-radius: 10px">
        <h2 v-if="this.sameStations">Vänligen välj olika stationer att resa emellan.</h2>
        <h2 v-if="this.missingStations">
          Vänligen fyll i stationer samt datum för din resa.
        </h2>
      </div>
    </v-row>

    <v-row v-if="this.validSearch">
      <search-result
        :resultArray="this.results"
        class="px-11"
        style="width: 100%; padding-top: 30px; padding-bottom: 30px"
      />
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
  props: {},
  data: function () {
    return {
      fetchingResult: false,
      missingStations: false,
      sameStations: false,
      validSearch: null,
      results: [],
      amountOfTickets: this.$store.state.chosenAmountOfTickets,
      searchResultDepartureDate: null,
      searchResultFromStation: null,
      searchResultToStation: null,
    };
  },
  methods: {
    getStation(id) {
      return new Promise(function (resolve, reject) {
        const url = `${process.env.VUE_APP_API_URL}/station/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => resolve(data.name))
          .catch((err) => reject(err));
      });
    },
    reduceAmountOfTickets() {
      if (this.amountOfTickets > 1) {
        this.amountOfTickets = this.amountOfTickets - 1;
        this.$store.commit("setAmountOfTickets", this.amountOfTickets);
      }
    },

    increaseAmountOfTickets() {
      this.amountOfTickets = this.amountOfTickets + 1;
      this.$store.commit("setAmountOfTickets", this.amountOfTickets);
    },

    /* This is so that the black search result field is not updated instantly upon change,
    but only after using Sök Resa button. */
    setSearchInformation() {
      this.searchResultDepartureDate = this.$store.state.chosenDepartureDate;
      this.getStation(this.$store.state.originStation).then(
        (res) => (this.searchResultFromStation = res)
      );
      this.getStation(this.$store.state.destinationStation).then(
        (res) => (this.searchResultToStation = res)
      );
    },

    resetSearchButton() {
      this.fetchingResult = false;
    },

    searchTravels() {
      if (this.fetchingResult) return;

      this.fetchingResult = true;
      this.setSearchInformation();
      this.results = [];

      //Origin or Destination is null
      if (!this.$store.state.originStation || !this.$store.state.destinationStation) {
        this.missingStations = true;
        this.sameStations = false;
        this.validSearch = false;
        this.fetchingResult = false;
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
          this.fetchingResult = false;
        }

        //Valid search
        if (this.$store.state.originStation != this.$store.state.destinationStation) {
          this.sameStations = false;
          this.missingStations = false;
          this.validSearch = true;
        }

        if (this.validSearch) {
          const url = `${process.env.VUE_APP_API_URL}/route?from=${this.$store.state.originStation}&dest=${this.$store.state.destinationStation}&date=${this.$store.state.chosenDepartureDate}`;
          fetch(url)
            .then((res) => res.json())
            .then((data) => (this.resultData = data))
            .then(() => {
              for (var i = 0; i < this.resultData.length; i++) {
                this.results.push(this.resultData[i]);
              }
              setTimeout(() => {
                this.resetSearchButton();
              }, 1000);
            })
            .catch((err) => {
              console.log(err.message);
              setTimeout(() => {
                this.resetSearchButton();
              }, 1000);
            });
        }
      }
    },
  },
};
</script>
