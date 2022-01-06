<template>
  <v-row justify="center" style="margin: 20px;">
    <v-toolbar elevation="5" max-width="800" style="border-radius: 8px;">
      <div style="width: 50px">
        <v-toolbar-title>{{ titel }}</v-toolbar-title>
      </div>
      <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
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
      items: [],
      search: null,
      select: null,
      stations: [],
      rawStationData: [],
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
        this.$store.commit("setOrigin", this.rawStationData[this.stations.indexOf(val)].id);
        console.log(this.rawStationData[this.stations.indexOf(val)])
      }
      if (this.titel == "Till") {
        this.$store.commit("setDestination", this.rawStationData[this.stations.indexOf(val)].id);
      }
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.stations.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
     saveSelected ()  {
        if (this.$store.state.originStation && this.$store.state.destinationStation) {
          if (this.titel == "Från") {
            return this.rawStationData.find(x => x.id = this.$store.state.originStation)
          }
          if (this.titel == "Till") {
            return this.rawStationData.find(x => x.id = this.$store.state.destinationStation)
            //return this.$store.state.destinationStation;
          }
        } else {
          return "Hållplats";
        }
      },
  },
  mounted() {
    fetch("http://localhost:3000/station")
      .then((res) => res.json())
      .then((data) => (this.rawStationData = data))
      .then(() => {
        for (var i = 0; i < this.rawStationData.length; i++) {
          this.stations.push(this.rawStationData[i].name);
        }
      })
      .catch((err) => console.log(err.message));
  },
};
</script>
