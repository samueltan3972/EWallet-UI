<template>
    <v-content fill-height>
      <v-layout align-center justify-center fill-height>
        <qrcode :value="userObj.user_wallet_addr" :options="{ width: 200 }"></qrcode>
      </v-layout>
    </v-content>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  computed:{
    ...mapGetters('auth',[
      'userObj'
    ])
  },
  created(){

  }
}
</script>
