<template>
 <div >
   <ol v-for="pet in pets" :key ="pet.id" >
     <v-card elevation="24">    <h1>{{pet.name}}</h1>
     <h2>{{pet.species}}</h2>
    <h2>{{pet.ownerId}}</h2></v-card>
   </ol>
 </div>
</template>

<script>
export default {
  data() {
    return{
      pets: []
    }
  },
  mounted(){
    fetch('http://localhost:3000/api/pets').then(res => res.json()).then(data=> this.pets = data).catch(err => console.log(err.message)) 
  }
}
</script>