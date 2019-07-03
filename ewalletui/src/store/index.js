import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'
import { wallet } from './wallet.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    dialog: null // popup used
  },
  modules: {
    auth: auth,
    wallet: wallet
  }
})
