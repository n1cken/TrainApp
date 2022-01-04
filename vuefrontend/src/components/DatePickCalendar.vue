<template>
  <div>
    <v-row
      style="display: flex; align-items: center; justify-content: center; height: 66px"
    >
      <options-box v-if="this.titel == 'RETURRESA'" title="Återresa" />
      <h4 style="width: 30%">{{ this.titel }}</h4>
    </v-row>
    <v-row justify="center" style="margin-bottom: 30px">
      <v-date-picker
        :disabled="this.titel == 'RETURRESA' && !this.$store.state.options[0]"
        v-model="picker"
        show-week
        class="mx-8"
        width="350"
        elevation="3"
        @change="changeDate()"
        :min="new Date().toISOString().substr(0, 10)"
      ></v-date-picker>
    </v-row>
  </div>
</template>

<script>
import OptionsBox from "../components/OptionsBox.vue";

export default {
  components: {
    OptionsBox,
  },
  props: {
    titel: String,
  },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  methods: {
    changeDate() {
      if (this.titel == "AVRESA") {
        this.$store.commit("setDepartureDate", this.picker);
      }
      else if (this.titel == "RETURRESA") {
        this.$store.commit("setReturnDate", this.picker);
      }
    },
  },
  mounted() {
    if (this.titel == "AVRESA") {
      this.picker = this.$store.state.chosenDepartureDate;
    }
    else if (this.titel == "RETURRESA") {
      this.picker = this.$store.state.chosenReturnDate;
    }
  },
};
</script>
