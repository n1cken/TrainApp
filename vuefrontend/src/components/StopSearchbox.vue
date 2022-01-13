<template>
  <v-row justify="center" style="margin: 20px">
    <v-toolbar elevation="5" max-width="800" style="border-radius: 8px">
      <div style="width: 50px">
        <v-toolbar-title>{{ titel }}</v-toolbar-title>
      </div>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="stations"
        :search-input.sync="search"
        cache-items
        class="mx-3"
        flat
        hide-no-data
        hide-details
        :label="this.saveSelected()"
        solo-inverted
        auto-select-first
      >
      </v-autocomplete>
    </v-toolbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      search: null,
      select: null,
      stations: [],
      rawStationData: [],
      searchResultFromStation: null,
      searchResultToStation: null,
    };
  },
  props: {
    titel: String,
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select(val) {
      if (this.titel == "Från") {
        this.$store.commit(
          "setOrigin",
          this.rawStationData[this.stations.indexOf(val)].id
        );
      }
      if (this.titel == "Till") {
        this.$store.commit(
          "setDestination",
          this.rawStationData[this.stations.indexOf(val)].id
        );
      }
    },
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
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.stations = this.stations.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    saveSelected() {
      if (this.$store.state.originStation && this.$store.state.destinationStation) {
        if (this.titel == "Från") {
          this.getStation(this.$store.state.originStation).then(
            (res) => (this.searchResultFromStation = res)
          );
          return this.searchResultFromStation;
        }
        if (this.titel == "Till") {
          this.getStation(this.$store.state.destinationStation).then(
            (res) => (this.searchResultToStation = res)
          );
          return this.searchResultToStation;
          //return this.$store.state.destinationStation;
        }
      } else {
        return "Hållplats";
      }
    },
  },
  mounted() {
    const url = `${process.env.VUE_APP_API_URL}/station`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.rawStationData = data))
      .then(() => {
        this.rawStationData.forEach((station) => {
          this.stations.push(station.name);
        });
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
