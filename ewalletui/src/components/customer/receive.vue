<template>
    <v-content>
      <qrcode :value="userObj.user_wallet_addr" :options="{ width: 200 }"></qrcode>
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
