<template>
  <div>
    <v-row style="display: flex; flex-wrap: wrap" justify="center">
      <v-col
        cols="12"
        sm="12"
        md="12"
        style="background-color: rgb(0, 0, 0); height: 300px"
      >
        <h1 class="my-4" style="color: white; font-size: 30px; padding-top: 30px">
          BOKA BILJETT
        </h1>
        <p class="my-4" style="color: white; font-size: 25px">
          {{ this.searchResultDepartureDate }}
        </p>
        <div class="my-4" style="color: white; font-size: 35px">
          {{ this.fromStation }}
          <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
          {{ this.toStation }}
        </div>
      </v-col>

      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item color="blue" fill-dot right>
          <v-card>
            <v-card-title class="blue">
              <v-col
                style="width: 300px"
                cols="12"
                md="12"
                class="text-h4 white--text font-weight-light"
              >
                Train 1</v-col
              >
            </v-card-title>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      searchResultDepartureDate: null,
      fromStation: null,
      toStation: null,
    };
  },
  methods: {
    getStation(id) {
      return new Promise(function (resolve, reject) {
        const url = `http://localhost:3000/station/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => resolve(data.name))
          .catch((err) => reject(err));
      });
    },
  },
  mounted() {
    this.searchResultDepartureDate = this.$store.state.chosenDepartureDate;

    this.getStation(this.$store.state.originStation).then(
      (res) => (this.fromStation = res)
    );

    this.getStation(this.$store.state.destinationStation).then(
      (res) => (this.toStation = res)
    );

    fetch(
      "http://localhost:3000/timetable?" +
        this.$route.query.from +
        "&" +
        this.$route.query.to +
        "&" +
        this.$route.query.date +
        "&" +
        this.$route.query.routeId
    )
      .then((res) => res.json())
      .then((data) => (this.resultData = data))
      .then(() => {})
      .catch((err) => console.log(err.message));
  },
  computed() {},
};
</script>
