<template>
  <div class="body-top">
  <nav-header title="设置个人资料" :password="true"></nav-header>
  <form id="userimg"  method="post" enctype="multipart/form-data">
    <input type="file" name="imgFile" accept="image/gif,image/jpeg,,image/png,image/jpg,"
        id="imgFile" hidden v-on:change="changImg($event)">
    <input type="hidden"  name="userId" :value="usermsg.userId">
    <input type="hidden"  name="type" value="user">
  </form>
  <form action="post" class="padding-20-20 main" id="usermsg">
    <div class="per-logo" @click="selImg">
    		<img class="fullsrc" :src="usermsg.user_logo" id="user-logo">
    </div>

    <input type="hidden" :value="usermsg.userId" name="userId">
    <ul class="form-box">
      <li>
        <input-box title="昵称" title-color="black" name="username" :placeholder="usermsg.username"></input-box>
      </li>
      <li style="font-size:0.9rem" v-if="isSelect">
        <span class="float-left" >学校</span>
        <search-select style="margin-left:.5rem" class="float-left" name="school" :is-search="true"  :value = 'usermsg.school'></search-select>
      </li>
      <li v-if="!isSelect" style="font-size:0.9rem" @click="open">
        <span class="float-left" >学校</span>
        <input-box  title-color="black" :value="usermsg.school" ></input-box>
      </li>
      <li>
        <input-box title="专业" title-color="black" name="profession" :value="usermsg.profession"></input-box>
      </li>
      <li>
        <input-box title="爱好" title-color="black" name="interest" :value="usermsg.interest"></input-box>
      </li>
      <li>
        <input-box title="擅长" title-color="black" name="good_skill" :value="usermsg.good_skill"></input-box>
      </li>
      <li>
        <input-box title="邮箱" type="email" title-color="black" name="email" :value="usermsg.email"></input-box>
      </li>
      <div style="margin:.5rem 0;font-size:.8rem" v-if="usermsg.identy==1">
        <span >答人简介</span>
        <el-input
          style="padding:.5rem 0"
          type="textarea"
          name="introduction"
          autosize
          :value="usermsg.introduction">
        </el-input
      </div>
    </ul>
  </form>
  <div class="submit text-center ztc" @click="updata()">保存并返回</div>
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
        userId:window.localStorage.userId,
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
    open(){
      this.isSelect=true;
      console.log(this.isSelect)
    },
    changImg(event){
		    var files = event.target.files, 
            file;
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
      file.click();
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
      var ret = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(document.getElementById('imgFile').value){
        this.uploadImg();
      }
      if($("input[name='email']").val()!==''){
        let isEmail = ret.test($("input[name='email']").val());
        if(isEmail==false){
          alert('请输入正确的邮箱地址',$("input[name='email']").val());
          return false;
        }
      }
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
          }else{
            alert('该用户名已存在')
          }
          console.log(data)
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(xhr, status, err.toString());
        }.bind(this)
      });
    },
    uploadImg(){
      var formData = new FormData($("#userimg")[0]);
      console.log('img upload',formData);
      $.ajax({
        url:'/api/uploadImage',
        type:'post',
        dataType:'json',
        processData: false,
        contentType: false,
        data:formData,
        success: data => {
          console.log('imgsuccess',data.msg);
        },
        error: err => {
          console.error(err)
        }
      })
    }
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
.submit{
  width:100%;
  position: fixed;
	bottom:0;
  height:2rem;
  line-height:2rem;
  color:aliceblue
}
</style>
