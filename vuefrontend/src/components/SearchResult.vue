<template>
  <v-data-table
    :headers="headers"
    :items="resultArray"
    :sort-by="[]"
    multi-sort
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <router-link
        :to="{
          path: 'booking',
          query: {
            from: item.From,
            to: item.To,
            date: item.departure,
            routeId: item.routeId,
          },
        }"
        style="text-decoration: none; color: inherit"
      >
        <v-btn
          dark
          small
          color="blue"
          elevation="2"
          class="mr-2"
          @click="bookTicket(item)"
        >
          BOKA
        </v-btn>
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "SearchResult",
  components: {},
  data: function () {
    return {
      headers: [
        {
          text: "AVGÅNG",
          align: "start",
          value: "departure",
        },
        { text: "ANKOMST", value: "arrival" },
        { text: "Från", value: "From" },
        { text: "Till", value: "To" },
        { text: "PRIS", value: "protein" },
        { text: "BOKA", value: "actions" },
      ],
    };
  },
  props: ["resultArray"],
  methods: {
    onButtonClick(item) {
      console.log("click on ", item);
      console.log("results ", this.resultArray);
    },
  },
};
</script>
