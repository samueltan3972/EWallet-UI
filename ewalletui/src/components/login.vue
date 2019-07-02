<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form">
                    <v-text-field v-model="email" :rules="emailRules" prepend-icon="person" name="email" label="Email" type="text" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" name="password" label="Password" id="password" type="password" required></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="submitLogin">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <FlashMessage></FlashMessage>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data(){
    return{
      email: "",
      emailRules:[
        v => !!v || 'Email is required'
      ],
      password: "",
      passwordRules:[
        v => !!v || 'Password is required'
      ]
    }
  },
  computed:{
    ...mapGetters('auth',[
      'authenticating',
      'authenticationError',
      'authenticationErrorCode'
    ])
  },
  methods: {
    ...mapActions('auth', [
          'login'
      ]),
    submitLogin(){
      var self = this

      if (this.$refs.form.validate()) {
          this.login({email: this.email, password: this.password})
            .then(function(r){
              if(!r){
                self.flashMessage.error({title: 'Error', message: 'Invalid email or password!'})
                self.password = ""
              } else{
                self.flashMessage.success({title: 'Success', message: 'Login success!'})
              }
          })

      }
    }
  }
}
</script>
