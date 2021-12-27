<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Boka biljett
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Boka biljett</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="pickedSeats"
                  v-on:input="limiter"
                  :items="seats"
                  label="Välj vilken plats/platser du vill boka"
                  multiple
                  chips
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Stäng
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Boka
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    pickedSeats: [],
    seats: [],
  }),
  methods: {
    limiter(e) {
      if (e.length > 5) {
        console.log(" you can only select five", e);
        e.pop();
      }
    },
  },
  mounted() {
    for (let index = 0; index < 30; index++) {
      this.seats.push(index);
    }
  },
};
</script>
