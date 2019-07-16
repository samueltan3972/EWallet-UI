<template>
  <!-- template after user login -->
  <v-app id="inspire" v-if="isLoggedIn">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="{ name: 'home'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'pay'}">
          <v-list-tile-action>
            <v-icon>payment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Pay</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'receive'}">
          <v-list-tile-action>
            <v-icon>assignment_returned</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Receive</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="blue accent-2" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>E-wallet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer color="blue accent-2" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>

  <!-- template for not login -->
  <v-app v-else>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>E-wallet</span>
      </v-toolbar-title>
	  <v-spacer></v-spacer>

  	  <v-toolbar-items>
        <v-btn flat :to="{ name: 'login'}">Login</v-btn>
        <v-btn flat :to="{ name: 'register'}">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>

</template>


<script>
import { mapActions } from "vuex"

export default {
  data(){
    return{
      drawer: false
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.getters['auth/loggedIn']
    }
  },
  methods:{
    ...mapActions('auth', [
        'logout'
    ])
  }
}
</script>
