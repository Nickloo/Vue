<template>
  <div class="body">
  	<nav-header title="注册" :back="true"></nav-header>
  	<form class="top-bar" id="editform">
  		<input-box titleId="user_name" letter-spacing="0.4rem" name="user_name" padding="0 1rem" title="用户名" title-color="black"></input-box>
	    <input-box class="top-1" titleId="password"  letter-spacing="1rem" name="password"  padding="0 1rem" type="password" title="密码"  title-color="black"></input-box>
	    <input-box class="top-1" titleId="psd_check"  name="psd_check"  padding="0 1rem" type="password" title="确认密码"  title-color="black"></input-box>
	    <!-- <input type="text" v-model="password"> -->
      <input type="submit" value="提交">
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
      let user_name=$("input[name='user_name']").val();
  		let password=$("input[name='password']").val();
  		let psd_check=$("input[name='psd_check']").val();
      console.log(user_name+"********")
      if(user_name===""){
        alert("用户名不能为空")
        return false
      }
      if(password===""){
        alert("密码不能为空")
        return false
      }
      if(psd_check===""){
        alert("请输入确认密码")
        return false
      }
      if(password!=psd_check){
        alert("密码输入不一致,请再次输入")
        return false
      }
  		if(password===psd_check){

        $.ajax({
            url: '/api/register',
            type:'post', 
            dataType: 'json',
            crossDomain: true,
            cache: true,
            data: $('#editform').serialize(),//序列化
            success: function(data) {
              console.log(data);
              // global.user_name = this.user.user_name  
              // window.history.go(-1)
              alert('注册成功')
              this.$router.push("/home")
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("注册失败/n");
              console.log(err)
            }.bind(this)
          });
  			
  		} 		
  	},
    submit(){
      
    }
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
