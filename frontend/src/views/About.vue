<template>
 <div >
    <ol >
        <v-card elevation="24">    
            <h1>Amount of tickets: {{this.$store.state.chosenAmountOfTickets}}</h1>
        </v-card>
   </ol>
 </div>
</template>

<script>
export default {
  data() {
    return{

    }
  },
}
</script>