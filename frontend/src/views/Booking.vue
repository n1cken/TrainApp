<template>
  <div>
    <v-row style="display: flex; flex-wrap: wrap" justify="center">
      <v-col
        cols="12"
        sm="12"
        md="12"
        style="background-color: rgb(0, 0, 0); height: 350px"
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
        <div class="my-4" style="color: white; font-size: 25px">
          {{ this.$store.state.ticketDepartureDate }}
          <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
          {{ this.$store.state.ticketArrivalDate }}
        </div>
      </v-col>

      <v-timeline>
        <v-timeline-item
          v-for="(station, index) in stationsOnRoute"
          :key="index"
          color="white"
          fill-dot
          right
        >
          <v-card>
            <v-card-title class="black">
              <v-row style="width: 65vw">
                <v-col style="" cols="12" class="text-h6 white--text font-weight-light">
                  {{ station }}
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-row>

    <v-container>
      <v-row align="center" class="py-6" justify="center">
        <v-col>
          <v-text-field v-model="mailInput" label="Mail" :rules="rules"></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-row class="py-6" justify="center">
      <v-btn
        id="noSeatsAvailable"
        :disabled="!success"
        style="color: white"
        x-large
        elevation="3"
        color="blue"
        @click="bookTicket()"
        v-scroll-to="{
          el: '#noSeatsAvailable',
          duration: 500,
          easing: 'linear',
          offset: 0,
          force: true,
          cancelable: true,
          x: false,
          y: true,
        }"
        >BEKRÄFTA OCH BETALA</v-btn
      >
    </v-row>

    <v-row style="color: black" v-if="!bookingSuccess" class="py-6" justify="center">
      <h3>Bokning kunde ej genomföras.</h3>
    </v-row>
    <v-row style="color: black" v-if="!bookingSuccess" class="py-6" justify="center">
      <h3>Ej tillräckligt med platser.</h3>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      searchResultDepartureDate: null,
      fromStation: "",
      toStation: "",
      mailInput: "",
      success: false,
      stationsOnRoute: [],
      bookingSuccess: true,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 50 || "Max 50 characters",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) ? (this.success = true) : (this.success = false);
        },
      ],
    };
  },
  methods: {
    getStation(id) {
      return new Promise(function (resolve, reject) {
        if (id === null) return;
        const url = `${process.env.VUE_APP_API_URL}/station/${id}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            resolve(data.name);
          })
          .catch((err) => reject(err));
      });
    },
    bookTicket() {
      if (!this.mailInput) return;

      let from = this.$route.query.from;
      let to = this.$route.query.to;

      var data = {
        timetableDepartureId: from,
        timetableArrivalId: to,
        email: this.mailInput,
        departure: this.$store.state.ticketDepartureDate,
        arrival: this.$store.state.ticketArrivalDate,
        routeIdentity: this.$route.query.routeId,
        ticketAmount: this.$store.state.chosenAmountOfTickets,
      };

      const url = `${process.env.VUE_APP_API_URL}/booking`;

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((res) => this.handleResponse(res))
        .catch((err) => this.handleResponse(err));
    },

    handleResponse(res) {
      if (res === true) {
        this.$router.replace({
          path: "confirmation",
          query: {
            from: this.$route.query.from,
            to: this.$route.query.to,
            date: this.$route.query.date,
            routeId: this.$route.query.routeId,
            mail: this.mailInput,
          },
        });
      } else {
        this.bookingSuccess = false;
      }
    },
  },
  beforeMount() {
    this.searchResultDepartureDate = this.$store.state.chosenDepartureDate;

    this.getStation(this.$store.state.originStation).then(
      (res) => (this.fromStation = res)
    );

    this.getStation(this.$store.state.destinationStation).then(
      (res) => (this.toStation = res)
    );

    //Get stations on route
    const url = `${process.env.VUE_APP_API_URL}/route/${this.$route.query.routeId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("earlydata ", data);
        this.rawStationData = data;
      })
      .then(async () => {
        for (var i = 0; i < this.rawStationData.length; i++) {
          console.log("rawstationdata", this.rawStationData[i]);
          await this.getStation(this.rawStationData[i].stationId).then((res) =>
            this.stationsOnRoute.push(res)
          );
        }
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
