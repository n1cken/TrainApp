<template>
  <v-row justify="center">
    <v-date-picker
      v-model="picker"
      show-week
      width="400"
      @change="changeDate()"
      :min="new Date().toISOString().substr(0, 10)"
    ></v-date-picker>
    <v-card width="350">
      <v-card-title>
        <p class="text-h4 text--primary">Datum för avgång</p>
      </v-card-title>
      {{ this.$store.state.chosenDepartureDate }}
    </v-card>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    changeDate() {
      this.$store.commit("setDepartureDate", this.picker);
    },
  },
};
</script>
