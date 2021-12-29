import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var today = new Date()

const Store = new Vuex.Store({
  state: {
    originStation: "",
    destinationStation: "",
    chosenDepartureDate: (`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
    options: [],
  },

  mutations: {
    setOrigin(state, station) {
      state.originStation = station
    },
    setDestination(state, station) {
      state.destinationStation = station
    },
    setDepartureDate(state, date) {
      state.chosenDepartureDate = date
    },
    addOptionsValue(state, value) {
      state.options.push(value)
    },
    removeOptionsValue(state, value) {
      state.options.splice(state.options.indexOf(value), 1)
    }
  },
})

export default Store;
