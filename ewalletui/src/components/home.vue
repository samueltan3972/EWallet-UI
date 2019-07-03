<template>
    <v-content v-if="isLoggedIn">
      <v-container fluid fill-height>
        <v-layout
          justify-center
        >
          <v-flex xs12>
            <div class="title">Your balance</div>
            <div class="display-3">{{balance}}</div>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <router-link :to="{ name: 'pay'}">
              <v-btn color="info">Scan & Pay</v-btn>
            </router-link>

            <router-link :to="{ name: 'receive'}">
              <v-btn color="info">Receive</v-btn>
            </router-link>

            <v-btn color="info" @click="$popup('reloadAmount.vue')">Reload</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <FlashMessage></FlashMessage>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data: () => ({
    drawer: false
  }),
  computed:{
    isLoggedIn(){
      return this.$store.getters['auth/loggedIn']
    },
    ...mapGetters('wallet',[
      'balance'
    ]),
  },
  methods:{
    ...mapActions('wallet', [
          'checkBalance'
      ]),
    ...mapActions('auth', [
          'getUserObj'
      ]),
  },
  mounted(){
    if(this.isLoggedIn){
      this.checkBalance()
      this.getUserObj()
    }
  }
}
</script>
