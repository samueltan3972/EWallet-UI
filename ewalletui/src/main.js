import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { TokenService } from './services/storage.service'
import ApiService from './services/api.service'

import router from './routes';
require('dotenv').config()

Vue.config.productionTip = false

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
