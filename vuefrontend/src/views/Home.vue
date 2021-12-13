<template>
  <div>
    <stop-searchbox titel="Från" />
    <stop-searchbox titel="Till" />
  </div>
</template>

<script>
// @ is an alias to /src
import StopSearchbox from "../components/StopSearchbox.vue";

export default {
  name: "Home",
  components: {
    StopSearchbox,
  },
};
</script>
