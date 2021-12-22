<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
    <v-row>
      <options-box title="Wheelchair" />
      <options-box title="Dog" />
    </v-row>
    <date-pick-calendar show-current />

    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-btn large elevation="" color="blue" @click="searchTravels()">Sök resa</v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <booking-dialog/>
      </v-col>             
    </v-row>

    <v-row justify="center">
      <h2 v-if="this.validSearch"> Sökresultat </h2>
      <search-result v-if="this.validSearch"/>
      <h2 v-if="this.sameStations">Vänligen välj olika stationer att resa emellan.</h2>
      <h2 v-if="this.missingStations">Vänligen fyll i stationer samt datum för din resa.</h2>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import StopSearchbox from "../components/StopSearchbox.vue";
import DatePickCalendar from "../components/DatePickCalendar.vue";
import OptionsBox from "../components/OptionsBox.vue";
import SearchResult from "../components/SearchResult.vue";
import BookingDialog from '../components/BookingDialog.vue';

export default {
  name: "Home",
  components: {
    OptionsBox,
    StopSearchbox,
    DatePickCalendar,
    SearchResult,
    BookingDialog,
  },
  data: function () {
    return {
      missingStations: true,
      sameStations: false,
      validSearch: false,
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
          console.log("Search valid. fetching data... ");
        }
      }
    },
  },
};
</script>
