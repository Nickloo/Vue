<template>
  <div class="body">
  	<nav-header title="注册" :back="true"></nav-header>
  	<form class="top-bar" id="editform">
  		<input-box titleId="user_name" letter-spacing="0.4rem" name="user_name" padding="0 1rem" title="用户名" title-color="black"></input-box>
	    <input-box class="top-1" titleId="password"  letter-spacing="1rem" name="password"  padding="0 1rem" type="password" title="密码"  title-color="black"></input-box>
	    <input-box class="top-1" titleId="psd_check"  name="psd_check"  padding="0 1rem" type="password" title="确认密码"  title-color="black"></input-box>
	    <!-- <input type="text" v-model="password"> -->
  	</form>
    <div>{{password}}</div>
    <div class="button-bot ztc" @click="register">确认注册</div>
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
      var user_name=$("input[name='user_name']").val();
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
            data: {
              user_name:user_name,
              password:hex_md5(password)
            },//序列化
            success: function(data) {
              console.log(data);
              if(data.status === 'OK'){
                alert('注册成功')
                window.localStorage.userId = data.data;
                console.log('userid is :',window.localStorage.userId)
                // window.localStorage.user = JSON.stringify(data.data[0]);
                // console.log(JSON.parse(window.localStorage.user));
                if(confirm('直接进入个人设置？') === true){
                    this.$router.push({name:'setmsg',params:{userId:data.data}})
                }else{
                    this.$router.push("/home")
                }
              }else{
                alert('用户名已存在')
              }
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
