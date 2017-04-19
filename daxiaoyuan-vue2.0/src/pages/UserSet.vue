<template>
  <div class="body body-top">
  <nav-header title="设置个人资料"></nav-header>
  <form action="post" class="padding-20 main" id="usermsg">
    <div class="per-logo" @click="selImg">
    		<img class="fullsrc" :src="test_logo" id="user-logo">
    </div>
    <input type="file"  id="imgFile" hidden v-on:change="changImg($event)">
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
  <div>{{test_logo}}</div>
  <div class="submit text-center ztc" @click="updata()">保存并返回</div>
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
      test_logo:'',
    }
  },
  mounted(){
    $.ajax({
      url:'/api/getUser',
      type:'get',
      dataType:'json',
      data:{userId:this.$route.params.userId},
      cache: true,
      success:(data)=>{
        this.usermsg = data.data[0]
      },
      error:(xhr, status, err)=>{
        console.error(xhr, status, err.toString())
      }
    })
  },
  methods:{
    changImg(event){
		    var files = event.target.files, file;
		    if (files && files.length > 0) {
		        // 获取目前上传的文件
		        file = files[0];// 文件大小校验的动作
		        if(file.size > 1024 * 1024 * 2) {
		            alert('图片大小不能超过 2MB!');
		            return false;
		        }
		        // 获取 window 的 URL 工具
		        var URL = window.URL || window.webkitURL;
		        // 通过 file 生成目标 url
		        var imgURL = URL.createObjectURL(file);
		        //用attr将img的src属性改成获得的url
		        $("#user-logo").attr("src",imgURL);
		        // 使用下面这句可以在内存中释放对此 url 的伺服，跑了之后那个 URL 就无效了
		        // URL.revokeObjectURL(imgURL);
		    }
		},
    selImg(){
      console.log('click img');
      let file = document.getElementById('imgFile');
      file.click()
    },
    imgClick(){
      this.test_logo = document.getElementById('imgFile').value;
    },
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
              this.$router.push('/person')
            }
          }
          console.log(data)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(xhr, status, err.toString());
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
