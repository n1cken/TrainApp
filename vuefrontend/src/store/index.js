import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    chosenDepartureDate: null,
    options: [],
  },
  mutations: {
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
