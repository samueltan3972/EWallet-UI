<template>
    <v-content>
      <div class="text-md-center title red--text">{{ error }}</div>
      <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
        <div v-if="validationSuccess" class="validation-succes">
          This is a URL
        </div>

        <div v-if="validationFailure" class="validation-failure red--text">
          Invalid qr code. Please try again.
        </div>

        <div v-if="validationPending" class="validation-pending">
          Loading...
        </div>
      </qrcode-stream>
    </v-content>
</template>

<script>
import { mapActions } from "vuex"

export default {
  data: () => ({
    error: '',
    camera: 'auto',
    isValid: undefined
  }),
  computed:{
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },
  methods:{
    ...mapActions('wallet',[
      'checkIsValidAddress'
    ]),

    resetValidationState () {
      this.isValid = undefined
    },

    onDecode(addr){
      var self = this

      this.turnCameraOff()

      this.checkIsValidAddress({ addr: addr }).
        then(async function(status){
          if(!status){
            self.isValid = false

            await self.timeout(2000)

            self.resetValidationState()
            self.turnCameraOn()
          } else {
            self.$popup('payAmount.vue', { receiver_wallet_addr: addr})
          }
        })
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    },

    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
</style>
