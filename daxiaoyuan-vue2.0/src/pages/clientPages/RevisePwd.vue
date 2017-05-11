<template>
  <div class="body">
    <nav-header :back="true" title="修改密码"></nav-header>  
    <ul class="top-bar">
        <li style="margin-top:1rem">
            <input-box titleId="old" placeholder="原密码" title-color="black" type="password" name="oldpwd"></input-box>
        </li>
        <li style="margin-top:1rem">
            <input-box titleId="new" placeholder="新密码最少8位" title-color="black" type="password" name="newpwd"></input-box>
        </li>
        <li style="margin-top:1rem">
            <input-box titleId="new" placeholder="确认输入" title-color="black" type="password" name="chackpwd"></input-box>
        </li>
    </ul>
    <el-button type="primary" class="float-right" style="margin-top:1rem" @click="revise">确认修改</el-button>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import InputBox from '../../components/InputBox'
export default {
  name: 'home',
  components:{
  	NavHeader,InputBox
  },
  data () {
    return {
    }
  },
  methods:{
    revise(){
      console.log(111)
      let parms = {
        oldpwd:hex_md5($("input[name='oldpwd']").val()),
        newpwd:hex_md5($("input[name='newpwd']").val()),
        token:window.localStorage.token,
        userId:window.localStorage.userId
      }
      if($("input[name='oldpwd']").val().trim()==''){
        alert('原密码不能为空');
        return false;
      }else if($("input[name='newpwd']").val().trim()==''){
        alert('新密码不能为空');
      }else if($("input[name='chackpwd']").val().trim()==''){
        alert('再次输入不能为空');
      }else if($("input[name='newpwd']").val().trim()!=$("input[name='chackpwd']").val().trim()){
        alert('两次输入不同');
      }else{
        $.ajax({
          url:'/api/revisePsd',
          type:'post',
          dataType:'json',
          data:parms,
          success: data => {
            if(data.status==='OK'){
              alert('密码修改成功')
              this.$router.go(-1);
            }else{
              alert(data.msg); 
            }
          },
          error: err => {
            console.error(err);
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
