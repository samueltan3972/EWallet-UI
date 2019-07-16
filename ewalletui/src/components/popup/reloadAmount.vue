<template lang="html">
  <v-dialog v-model="$store.state.dialog" fullscreen hide-overlay>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$store.state.dialog = false">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>Reload</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout align-center justify-center fill-height pt-5 mt-5>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="amount"
            label="Enter amount to reload"
            placeholder="0.00"
            outline
            type="number"
            clearable
          ></v-text-field>

          <v-flex>
            <v-btn color="info" @click="reloadSubmit">Reload</v-btn>
          </v-flex>
        </v-flex>
    </v-layout>
    <FlashMessage></FlashMessage>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props:[
    'props'
  ],
  data(){
    return {
      amount: 0
    }
  },
  methods:{
    ...mapActions('wallet', [
        'topup',
        'checkBalance'
      ]),
    reloadSubmit(){
      this.$store.state.dialog = false
      this.$popup('checkout.vue', { amount: this.amount })
      // var self = this
      //
      // this.topup({ amount: this.amount }).
      //   then(function(message){
      //     if(message != "ok"){
      //       self.flashMessage.error({title: 'Error', message: message})
      //     } else {
      //       self.checkBalance()
      //       self.$store.state.dialog = false
      //       self.flashMessage.success({title: 'Success', message: "Reload successful"})
      //     }
      //   })
    }
  }
}
</script>
