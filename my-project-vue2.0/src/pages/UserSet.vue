<template>
  <div class="body body-top">
  <nav-header back="true" title="个人资料"></nav-header>
  <div class="top-bar"></div>
  <form action="post" class="padding-20 main">
  	<input-box title="昵称" title-color="black" ></input-box>
    <input-box title="学校" title-color="black" ></input-box>
    <input-box title="专业" title-color="black" ></input-box>
    <input-box title="爱好" title-color="black" ></input-box>
    <input-box title="擅长" title-color="black" ></input-box>
    <input-box title="邮箱" title-color="black" ></input-box>
  </form>
  </div>
</template>

<script>
import InputBox from "../components/funComponents/InputBox"
import NavHeader from '../components/NavHeader'
export default {
  name: 'user-set',
  components:{
  	InputBox,NavHeader
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
}
</style>
