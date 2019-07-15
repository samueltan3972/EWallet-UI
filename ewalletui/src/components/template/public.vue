<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">E-wallet</span>
      </v-toolbar-title>
	  <v-spacer></v-spacer>
	
	  <v-toolbar-items>
        <v-btn flat>Login</v-btn>
        <v-btn flat>Register</v-btn>
		<v-btn flat>Top Up</v-btn>
		<v-btn flat>Balance</v-btn>
		<v-btn flat>Log Out</v-btn>
      </v-toolbar-items>
							
						
      
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
	                        
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
export default {

}
</script>
