<template>
  <div>
        <Lobby msg="Sök resa"/>
      <v-card height="100" elevation="0"> </v-card> <!-- Horizontal spacer test -->
         <Lobby msg="Populära resmål"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Lobby from "@/components/Lobby.vue";

export default {
  name: "Home",
  components: {
    Lobby,
  },
};
</script>
