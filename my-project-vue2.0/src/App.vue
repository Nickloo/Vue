<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
    <!-- hello -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import Home from './pages/Home'
export default {
  name: 'app',
  components: {
    Hello,Home
  }
}
</script>

<style>
@import './assets/init.css'
/*公共样式*/
.wrapper{
  overflow :hidden; 
  /*display :relative;*/
}
/*App样式*/
#app{
  width:100%;
  height: 100%;
}
</style>
