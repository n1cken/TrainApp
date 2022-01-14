<template>
  <div>
    <h1>{{ msg }}</h1> <!-- Sök Resa skickas nu som prop genom Home.vue -->

    <v-container class="grey lighten-5">
      <v-row>

        <v-col cols="6" sm="2" md="2">
          <v-card elevation="2" width="300" height="400">
            <v-card-title> This card is found in Lobby.vue </v-card-title>

            <v-btn
            @click="getAllStations"
            > Test Button </v-btn>
          </v-card>
        </v-col>

                <v-col cols="6" sm="2" md="2">
          <v-card elevation="2" width="300" height="400">
            <v-card-title> This card is found in Lobby.vue </v-card-title>

            <v-btn
             @click="getAllStations"
             > Test Button </v-btn>
          </v-card>
        </v-col>

        <!-- New column -->
                <v-col cols="6" sm="2" md="4">
          <v-card elevation="2" width="300" height="400">
            <v-card-title> This card is found in Lobby.vue </v-card-title>

            <v-btn
             @click="getAllStations"
            > Test Button </v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="2">
          <v-card elevation="2" width="300" height="400">
            <v-card-title> This card is found in Lobby.vue </v-card-title>

            <v-btn
             @click="getAllStations"
            > Test Button </v-btn>
          </v-card>
        </v-col>
                <v-col cols="12" md="2">
          <v-card elevation="2" width="300" height="400">
            <v-card-title> This card is found in Lobby.vue </v-card-title>

            <v-btn
             @click="getAllStations"
            > Test Button </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Lobby",
  data: function () {
    return {
      example: null,
    };
  },
  props: {
    msg: String,
  },
  methods: {
  },
  watch: {},

  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
