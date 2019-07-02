import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { TokenService } from './services/storage.service'

import ApiService from './services/api.service'
ApiService.init(process.env.VUE_APP_ROOT_API)

import store from './store/index.js'

import router from './routes';
require('dotenv').config()

import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage, {time: 3000});

Vue.config.productionTip = false


// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
