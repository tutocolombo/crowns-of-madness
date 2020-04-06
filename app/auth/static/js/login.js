import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.esm.browser.min.js'
import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.esm.browser.min.js'
import LoginTemplate from './templates/login.template.js'

import LoginForm from './components/login_form.js'
import Register from './components/register.js'
import ResetPassword from './components/reset_password.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '*', component: LoginForm } ,
    { path: '/auth/register', component: Register },
    { path: '/auth/reset_password', component: ResetPassword }
  ],
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  template: LoginTemplate,
})
