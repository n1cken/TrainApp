import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    chosenDepartureDate: null,
  },
  mutations: {
    setDepartureDate (state, date) {
        state.chosenDepartureDate = date
        }
    },
})

export default Store;