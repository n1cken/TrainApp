<template>
  <div>
    <v-row style="display: flex; flex-wrap: wrap" justify="center">
      <v-col
        cols="12"
        sm="12"
        md="12"
        style="background-color: rgb(0, 0, 0); height: 500px"
      >
        <h1 class="my-4" style="color: white; font-size: 30px; padding-top: 30px">
          BILJETT BOKAD
        </h1>
        <p class="my-4" style="color: white; font-size: 25px">
          {{ this.searchResultDepartureDate }}
        </p>
        <div class="my-4" style="color: white; font-size: 35px">
          {{ this.fromStation }}
          <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
          {{ this.toStation }}

          <div class="my-10" style="color: white; font-size: 25px">
            {{ this.$store.state.ticketDepartureDate }}
            <v-icon aria-hidden="false" color="white"> mdi-arrow-right </v-icon>
            {{ this.$store.state.ticketArrivalDate }}
          </div>

          <p class="my-4" style="color: white; font-size: 25px">
            Antal biljetter: {{ this.$store.state.chosenAmountOfTickets }}
          </p>

          <p class="my-4" style="color: white; font-size: 25px">
            Bekräftelsemail skickad till : {{ this.$route.query.mail }}
          </p>
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
      fromStation: "",
      toStation: "",
      mailInput: "",
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
  },
  beforeMount() {
    this.searchResultDepartureDate = this.$store.state.chosenDepartureDate;

    this.getStation(this.$store.state.originStation).then(
      (res) => (this.fromStation = res)
    );

    this.getStation(this.$store.state.destinationStation).then(
      (res) => (this.toStation = res)
    );
  },
};
</script>
