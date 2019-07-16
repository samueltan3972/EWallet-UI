import Vue from 'vue'

// Dependency
import './plugins/vuetify'
import FlashMessage from '@smartweb/vue-flash-message'
import VueQrcodeReader from "vue-qrcode-reader"
import VueQrcode from '@chenfengyuan/vue-qrcode';
import LoadScript from 'vue-plugin-load-script';

require('dotenv').config()

Vue.use(FlashMessage, {time: 3000});
Vue.use(VueQrcodeReader);
Vue.use(LoadScript);
Vue.component(VueQrcode.name, VueQrcode);

// System file - Vuex, axios, router
import App from './App.vue'
import { TokenService } from './services/storage.service'
import ApiService from './services/api.service'
import store from './store/index.js'
import router from './routes'

ApiService.init(process.env.VUE_APP_ROOT_API)

// Helper function
import popup from './helper/popup'

Vue.prototype.$popup = popup

Vue.config.productionTip = false


// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
