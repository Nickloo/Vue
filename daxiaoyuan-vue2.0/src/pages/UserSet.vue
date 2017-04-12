<template>
  <div class="body body-top">
  <nav-header :back="true" title="设置个人资料"></nav-header>
  <form action="post" class="padding-20 main" id="usermsg">
    <div class="per-logo">
    		<img class="fullsrc" :src="test_logo">
    </div>
    <input type="file" hidden>
    <input type="hidden" :value="usermsg.userId" name="userId">
  	<input-box title="昵称" title-color="black" name="username" :placeholder="usermsg.username"></input-box>
    <div class="border-2"></div>
    <input-box title="学校" title-color="black" name="school" :placeholder="usermsg.school"></input-box>
    <div class="border-2"></div>
    <input-box title="专业" title-color="black" name="profession" :placeholder="usermsg.profession"></input-box>
    <div class="border-2"></div>
    <input-box title="爱好" title-color="black" name="interest" :placeholder="usermsg.interest"></input-box>
    <div class="border-2"></div>
    <input-box title="擅长" title-color="black" name="good_skill" :placeholder="usermsg.good_skill"></input-box>
    <div class="border-2"></div>
    <input-box title="邮箱" type="email" title-color="black" name="email" :placeholder="usermsg.email"></input-box>
  </form>
  <div class="submit text-center ztc" @click="updata()">保存</div>
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
      msg: 'Welcome to Your Vue.js App',
      usermsg:{},
      test_logo:'http://10.255.24.108:8088/public/images/timg.jpg'
    }
  },
  mounted(){
    this.usermsg = JSON.parse(window.localStorage.user);
    // console.log(this.usermsg)
  },
  methods:{
    del() { 
      var msg = "信息保存成功是否返回？ \n\n请确认！"; 
      if (confirm(msg)==true){ 
        return true; 
      }else{ 
        return false; 
      } 
    },
    updata(){
      $.ajax({
        url: '/api/setUser',
        type:'POST', 
        dataType: 'json',
        cache: true,
        data:$('#usermsg').serialize(),
        // async:false,
        success: function(data) {
          if(data.status === 'OK'){
            // alert('保存成功')
            if(confirm('保存成功是否返回上一页') === true){
              this.$router.push('/home')
            }
            window.localStorage.user = JSON.stringify(data.data[0]);
            
            // let test = del()
            // global.user.data.data[0]
          }
          console.log(data)
          
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(lunboArr, status, err.toString());
        }.bind(this)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.per-logo{
	height:5.0rem;
	width: 5.0rem;
	/*border-radius: 10.0rem;*/
	background: #eee;
	margin:0 auto;
}
.border-2{
  height: 0.1rem;
  width: 100%;
  background: #eee;
}
.submit{
  width:100%;
  position: fixed;
	bottom:0;
  height:2rem;
  line-height:2rem;
}
</style>
