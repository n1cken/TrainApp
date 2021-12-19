<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
    <v-row>
      <options-box title="Wheelchair"/>
      <options-box title="Dog"/>
    </v-row>
    <date-pick-calendar show-current @changeDate="changeDate($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StopSearchbox from "../components/StopSearchbox.vue";
import DatePickCalendar from "../components/DatePickCalendar.vue"
import OptionsBox from "../components/OptionsBox.vue"


export default {
  name: "Home",
  components: {
    OptionsBox,
    StopSearchbox,
    DatePickCalendar,
  },
  data: function () {
    return {
      chosenDate: null,
    };
  },
  methods: {
    changeDate (pickedDate) {
      this.chosenDate = pickedDate
    }
  }
};
</script>
