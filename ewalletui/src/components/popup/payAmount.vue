<template lang="html">
  <v-dialog v-model="$store.state.dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$store.state.dialog = false">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>Amount</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout align-center justify-center fill-height pt-5 mt-5>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="amount"
            label="Enter amount to pay"
            placeholder="0.00"
            outline
            type="number"
            clearable
          ></v-text-field>

          <v-flex>
            <v-btn color="info" @click="paySubmit">Pay</v-btn>
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
        'pay',
        'checkBalance'
      ]),
    paySubmit(){
      var self = this

      this.pay({ receiver_wallet_addr: this.props.receiver_wallet_addr, amount: this.amount }).
        then(function(message){
          if(message != "ok"){
            self.flashMessage.error({title: 'Error', message: message})
          } else {
            self.checkBalance()
            self.$store.state.dialog = false
            self.$router.push('/')
            self.flashMessage.success({title: 'Success', message: 'Payment completed'})
          }
        })
    }
  }
}
</script>
