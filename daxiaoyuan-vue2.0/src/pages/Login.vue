<template>
  <div class="login-body wrapper">
    <nav-header title="用户登陆"></nav-header>
    <div class="top-bar"></div>
    <form id='loginForm' class="msg-box wrapper padding-20 main width-max">
    	<input-box titleId="user_name" title="用户名" title-color="black" name="user_name"></input-box>
    	<input-box title="密码" titleId="password" letter-spacing="0.4rem" title-color="black" type="password" name="password"></input-box>
    </form>
    <div class="btn-box wrapper">
	    <div class="float-left" style="width:50%">
	    	<div class="div-center button ztc" @click="register">注册</div>
	    </div>
	    <div class="float-left" style="width:50%">
	    	<div class="div-center button ztc" @click="loginN">登陆</div>
	    </div>
    </div>    
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import InputBox from '../components/funComponents/InputBox'
export default {
  name: 'login',
  components:{
  	NavHeader,InputBox
  },
  data () {
    return {
    }
  },
  methods:{
  	login(){
      let user_name = $("input[name='user_name']").val();
      let password = $("input[name='password']").val();
      if(user_name===""){
        alert("请输入用户名")
        return false
      }
      if(password===""){
        alert("请输入密码")
        return false
      }

  		this.$router.push('/home')
  	},
  	register(){
  		this.$router.push('/register')
  	},
    loginN() {
        let params = {
          user_name:$("input[name='user_name']").val(),
          password:$("input[name='password']").val()
        }
        console.log(params)
        // this.$http.post('/api/login',params);
        $.ajax({
            url: '/api/login',
            type:'post', 
            dataType: 'json',
            crossDomain: true,
            cache: true,
            data: $('#loginForm').serialize(),//序列化
            success: function(data) {
              console.log(data);
              if(data.status === 'OK'){
                alert('登陆成功')
                this.$router.push("/home")
              }else{
                alert(data.msg)
              }
              // global.user_name = this.user.user_name  
              // window.history.go(-1)
             
            }.bind(this),
            error: function(xhr, status, err) {
              console.error("登陆失败/n");
              console.log(err)
            }.bind(this)
          });
    }      

  }
}
</script>

<style scoped>
.msg-box{
	margin-top: 5.0rem
}
.btn-box{
	margin-top: 1.0rem
}
</style>
