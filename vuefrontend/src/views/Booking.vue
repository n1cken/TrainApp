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
        <v-timeline-item
          v-for="(station, index) in stationsOnRoute"
          :key="index"
          color="white"
          fill-dot
          right
        >
          <v-card>
            <v-card-title class="black">
              <v-row style="width: 55vw" justify="center">
                <v-col style="" cols="12" class="text-h4 white--text font-weight-light">
                  {{ station }}</v-col
                >
              </v-row>
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
      stationsOnRoute: [],
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
    bookTicket() {
      var data = {
        timetableArrivalId: "helloworld",
        email: "email",
        timetableDepartureId: 123,
      };

      var json = JSON.stringify(data);

      var xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `http://localhost:3000/route?from=${this.$store.state.originStation}&dest=${this.$store.state.destinationStation}&date=${this.$store.state.chosenDepartureDate}`
      );
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(json);
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

    //Get stations on route
    const url = `http://localhost:3000/route/${this.$route.query.routeId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.rawStationData = data))
      .then(async () => {
        console.log("rawstationdata", this.rawStationData);
        for (var i = 0; i < this.rawStationData.length; i++) {
          console.log(this.rawstationdata);
          await this.getStation(this.rawStationData[i].stationId).then((res) =>
            this.stationsOnRoute.push(res)
          );
        }
      })
      .catch((err) => console.log(err.message));
  },

  computed() {},
};
</script>
