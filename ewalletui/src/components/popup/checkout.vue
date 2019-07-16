<template lang="html">
  <v-dialog v-model="$store.state.dialog" fullscreen hide-overlay>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$store.state.dialog = false">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>Checkout</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-layout align-center justify-center fill-height pt-5 mt-5>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Reload amount: MYR {{ amount }}</h3>
            </div>
          </v-card-title>

          <v-card-text>
            <div>
              <p>Please select your payment option: </p>
            </div>
            <div id="paypal-button-container"></div>
          </v-card-text>
        </v-card>


    </v-layout>
    <FlashMessage></FlashMessage>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex"
import LoadScript from 'vue-plugin-load-script';

export default {
  props:[
    'props'
  ],
  data(){
    return {
      credentials: {
        sandbox: 'AR_uXCq2iMqWzmgfbdnorri71iJUt1XE-S9Ax3fhp-HJPnmmp69D4X4TDcXpS4ToCFmUWv4GEm0CMR6F',
        production: ''
      }
    }
  },
  computed:{
    amount(){
      return this.props.amount
    }
  },
  methods:{
    ...mapActions('wallet', [
        'topup',
        'checkBalance'
      ]),
    checkout(){

    }
  },
  created(){
    var self = this

    this.$loadScript("https://www.paypal.com/sdk/js?client-id=AR_uXCq2iMqWzmgfbdnorri71iJUt1XE-S9Ax3fhp-HJPnmmp69D4X4TDcXpS4ToCFmUWv4GEm0CMR6F&currency=MYR").
    then(() => {
      paypal.Buttons({
        createOrder: function(data, actions) {
          // Set up the transaction
          return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "MYR",
                    value: self.amount
                  }
                }]
              });
            },
        onApprove: function(data, actions) {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
            alert('Transaction completed by ' + details.payer.name.given_name);

            self.topup({ amount: self.amount }).
              then(function(message){
                if(message != "ok"){
                  self.flashMessage.error({title: 'Error', message: message})
                } else {
                  self.checkBalance()
                  self.$store.state.dialog = false
                  self.flashMessage.success({title: 'Success', message: "Reload successful"})
                  self.router.go('')
                }
              })
          });
        }
      }).render('#paypal-button-container');
    })
  },
}
</script>
