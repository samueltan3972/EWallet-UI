// Register.vue

<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form">
                    <v-text-field v-model="username" :rules="usernameRules" :error-messages="error.name" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" :error-messages="error.email" prepend-icon="email" name="email" label="Email" type="email"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                    <v-text-field v-model="confirm_pass" :rules="confirm_passRules" prepend-icon="lock" name="confirm_pass" label="Confirm Password" id="confirm_pass" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="submitRegister">Register</v-btn>
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
      username: '',
      usernameRules:[
        v => !!v || 'Username is required'
      ],

      email: '',
      emailRules:[
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],

      password: '',
      passwordRules:[
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters'
      ],

      confirm_pass: '',
      confirm_passRules:[
        v => !!v || 'Password confirmation is required',
        v => (v && v == this.password) || 'Password confirmation must be same with password'
      ],

      error:{
        email: '',
        name: ''
      }
    }
  },
  computed:{
    ...mapGetters('auth',[
      'registerError'
    ])
  },
  methods: {
    ...mapActions('auth', [
          'register'
      ]),
    submitRegister(){
      var self = this

      if (this.$refs.form.validate()) {
          this.register({username: this.username, email: this.email, password: this.password, password_confirmation: this.confirm_pass})
            .then(function(r){
              if(!r){
                self.error = self.registerError
              } else{
                self.flashMessage.success({title: 'Success', message: 'Register success!'})
              }
          })

      }
    }
  }
}
</script>
