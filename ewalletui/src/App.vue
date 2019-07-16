<template>
  <div id="app">
    <router-view />
    <component :is="popup" :props="props" transition="dialog-bottom-transition"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      //
    }
  },
  computed: {
    dialog(){
      return this.$store.state.dialog
    },
    popup(){
      if(this.dialog){
        return require(`./components/popup/${this.dialog.file}`).default
      }
      return null
    },
    props(){
      var props

      try{
        props = this.dialog.props
      }catch(e){
        props = null
      }
      return props
    }
  }
}
</script>
