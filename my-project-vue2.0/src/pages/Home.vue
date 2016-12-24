<template>
  <div class="body wrapper">
    <nav-header title="首页"></nav-header>
    <!-- <h1>123</h1> -->
    <!-- hello -->
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
  name: 'home',
  components: {
    NavHeader
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
.body{
	height: 0.5rem
}
</style>
