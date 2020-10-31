import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.esm.browser.min.js'
import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.esm.browser.min.js'

import MainTemplate from './templates/main.template.js'
import Navbar from './components/navbar.js'
import About from './components/about.js'
import NotFound from './components/not_found.js'
import Index from './components/index.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Index } ,
    { path: '/index', component: Index } ,
    { path: '/about', component: About } ,
    { path: '*', component: NotFound }
  ],
  mode: 'history'
})

new Vue({
  el: '#app',
  components: {
    'navbar': Navbar
  },
  data: {
    number: 10,
    pusher: null,
  },
  router,
  methods: {
    initPusher(){
      wretch('/api/pusher_app')
      .get()
      .json(json => {
        this.pusher = this.newPusher(json)
      })
      // .then(() => this.subscribe())
      // .catch(error => {
      //   console.log(error)
      // })
    },
    newPusher({ key, cluster }){
      return new Pusher (key, {
        cluster: cluster,
        encrypted: true
      })
    }
  },

  created () {
    this.initPusher()
  },

  template: MainTemplate,
})
