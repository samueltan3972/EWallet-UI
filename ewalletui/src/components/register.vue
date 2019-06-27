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
                  <v-form>
                    <v-text-field v-model="username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                    <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email"></v-text-field>
                    <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                    <v-text-field v-model="password" prepend-icon="lock" name="confirm_pass" label="Confirm Password" id="confirm_pass" type="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="submitRegister">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import ApiService from '../services/api.service'

export default {
  data(){
    return{
      username: '',
      email: '',
      password: '',
      confirm_pass: ''
    }
  },
  methods: {
    submitLogin(){
      var data = {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_pass: this.confirm_pass
      }

      console.log(ApiService.post("api/login", data))
    }
  }
}
</script>
