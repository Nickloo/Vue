<template>
  <div class="body">
  	<nav-header title="注册"></nav-header>
  	<form class="top-bar">
  		<input-box name="user_name" padding="0 1rem" title="用户名" title-color="black"></input-box>
	    <input-box class="top-1" name="password"  padding="0 1rem" type="password" title="密码"  title-color="black"></input-box>
	    <input-box class="top-1" name="psd_check"  padding="0 1rem" type="password" title="确认密码"  title-color="black"></input-box>
	    <!-- <input type="text" v-model="password"> -->
  	</form>
    <div>{{password}}</div>
    <div class="button-bot ztc" style="width:" @click="register">确认注册</div>
  </div>
</template>

<script>
import InputBox from '../components/funComponents/InputBox'
import NavHeader from '../components/NavHeader'
export default {
  name: 'register',
  components:{
  	InputBox,NavHeader
  },
  data () {
    return {
      password:null,
      psd_check:null
    }
  },
  methods:{
  	register(){
  		let password=this.password
  		let psd_check=this.psd_check
  		if(password===psd_check){
  			this.$router.push("/home")
  		} 		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
