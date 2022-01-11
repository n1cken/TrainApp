import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/Booking.vue'
import Confirmation from '../views/Confirmation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
]

const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default Router
