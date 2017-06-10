<template>
  <div class="body-top">
  <nav-header title="粉丝资料" :back='true'></nav-header>
  <form action="post" class="padding-20-20 main" id="usermsg">
    <div class="per-logo">
    		<img class="fullsrc" :src="usermsg.user_logo" id="user-logo">
    </div>
    <!--<input type="hidden" :value="usermsg.userId" name="userId">-->
    <ul class="form-box">
      <li>
        <input-box title="昵称" title-color="black" name="username" :value="usermsg.username" :readonly="true"></input-box>
      </li>
      <li>
        <input-box title="学校" title-color="black" name="profession" :value="usermsg.school" :readonly="true"></input-box>
      </li>
      <li>
        <input-box title="专业" title-color="black" name="profession" :value="usermsg.profession" :readonly="true"></input-box>
      </li>
      <li>
        <input-box title="爱好" title-color="black" name="interest" :value="usermsg.interest" :readonly="true"></input-box>
      </li>
      <li>
        <input-box title="擅长" title-color="black" name="good_skill" :value="usermsg.good_skill" :readonly="true"></input-box>
      </li>
      <li>
        <input-box title="邮箱" type="email" title-color="black" name="email" :value="usermsg.email" :readonly="true"></input-box>
      </li>
      <!--<div style="margin:.5rem 0;font-size:.8rem" v-if="usermsg.identy==1">
        <span >答人简介</span>
        <el-input
          style="padding:.5rem 0"
          type="textarea"
          name="introduction"
          autosize
          :value="usermsg.introduction">
        </el-input>
      </div>-->
    </ul>
  </form>
  <!--<div class="submit text-center ztc" @click="update()">保存并返回</div>-->
  </div>
</template>

<script>
import InputBox from "../../components/InputBox"
import NavHeader from '../../components/NavHeader'
import SearchSelect from "../../components/SearchSelect"
export default {
  name: 'user-set',
  components:{
  	InputBox,NavHeader,SearchSelect
  },
  data () {
    return {
      usermsg:{},
      test_logo:'',
      isSelect:false,
      imgurl:''
    }
  },
  mounted(){
    $.ajax({
      url:'/api/getUser',
      type:'get',
      dataType:'json',
      data:{
        userId:this.$route.params.user_id,
        token:window.localStorage.token,
      },
      cache: true,
      success:(data)=>{
        if(data.status === 'OK'){
          this.usermsg = data.data
        }else{
          this.$router.push('/login')
        }

      },
      error:(xhr, status, err)=>{
        console.error(xhr, status, err.toString())
      }
    })
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.per-logo{
	height:5.0rem;
	width: 5.0rem;
	background: #eee;
	margin:0 auto;
}
.form-box li{
  overflow: hidden;
  height: 2.5rem;
  line-height: 2.5rem;
  padding:.1rem 0rem;
}
</style>
