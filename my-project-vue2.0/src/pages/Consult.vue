<template>
  <div class="body">
  <nav-header title="咨询"></nav-header>
    123
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
  name: 'consult',
  components:{
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
