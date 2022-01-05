<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="['calories', 'fat']"
    multi-sort
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-btn dark small color="blue" elevation="2" class="mr-2" @click="onButtonClick(item)"> BOKA </v-btn>
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
          value: "name",
        },
        { text: "ANKOMST", value: "calories" },
        { text: "RESTID", value: "fat" },
        { text: "ANTAL BYTEN", value: "carbs" },
        { text: "PRIS", value: "protein" },
        { text: "BOKA", value: "actions" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 200,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 200,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 300,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 300,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 400,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 400,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 400,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 400,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 500,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 500,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  props: {
    departure: String,
  },
  methods: {
    onButtonClick(item) {
      console.log("click on " + item.name);
    },
  },
};
</script>
