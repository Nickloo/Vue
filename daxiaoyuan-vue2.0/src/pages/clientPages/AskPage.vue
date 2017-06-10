<template>
  <div class="body">
    <nav-header :back="true" title="提问"></nav-header>
    <div class="top-bar">
        <ask-card home="true"></ask-card>
    </div>
    
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import AskCard from '../../components/AskCard'
export default {
  name: 'home',
  components:{
  	NavHeader,AskCard
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
