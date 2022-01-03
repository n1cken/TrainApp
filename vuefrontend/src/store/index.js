import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    originStation: null,
    destinationStation: null,
    chosenDepartureDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10),
    options: [],
  },

  mutations: {
    setOrigin (state, station ) {
      state.originStation = station
    },
    setDestination (state, station ) {
      state.destinationStation = station
    },
    setDepartureDate (state, date) {
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
