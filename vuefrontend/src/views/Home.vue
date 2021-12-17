<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
    <date-pick-calendar show-current/>
  </div>
</template>

<script>
// @ is an alias to /src
import StopSearchbox from "../components/StopSearchbox.vue";
import DatePickCalendar from "../components/DatePickCalendar.vue"


export default {
  name: "Home",
  components: {
    StopSearchbox,
    DatePickCalendar,
  },
  data: function () {
    return {
      
    }
  },
  methods: {
   
    }
  }

</script>
