import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Router from '@/router/index.js'
import Store from '@/store/index.js'

Vue.config.productionTip = false

Vue.use(vuetify)
Vue.use(Router);

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

new Vue({
  vuetify,
  router: Router,
  store : Store,
  render: h => h(App)
}).$mount('#app')
