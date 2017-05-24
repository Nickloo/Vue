<template>
  <div class="fullsrc" style="margin:0">
    <header class="nav-header">
      <router-link to="/admin">
        <h3 style="color:aliceblue" class="float-left">答校园用户管理</h3>
      </router-link>
      <el-button type="primary" size='mini' class="float-right" style="margin-top:.6rem" @click="logout()">登出</el-button>
      <el-button type="primary" size='mini' class="float-right" style="margin-top:.6rem;margin-right:.5rem" @click="revise">修改</el-button>
    </header>
    <div class="con-body container">
        <nav class="nav-menu">
          <el-menu default-active="3" class="el-menu-vertical-demo" theme="dark" router>
            <el-menu-item index="/admin/function">功能模块管理</el-menu-item>
            <el-submenu index="1">
              <template slot="title" id="usermsg">用户管理</template>
                <el-menu-item index="/admin/users" >用户信息管理</el-menu-item>
                <el-menu-item index="/admin/userapply">用户申请管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/allque">问答管理</el-menu-item>
          </el-menu>
        </nav>
        <div class="list-card float-right">
          <router-view></router-view>
        </div>
    </div>
    <!--功能模块管理-->
    
    <el-card class="box-card" v-if="is_revise">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary" @click="save()">保存</el-button>
        <el-button style="float: right;margin-right:.2rem" type="primary" @click="exit()">取消</el-button>
      </div>
      <ul>
        <li>
          <h4 class="float-left">原密码</h4>
          <el-input class="admin-input" type="password" v-model="old_psd" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <h4 class="float-left">新密码</h4>
          <el-input class="admin-input" type="password" v-model="new_psd" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <h4 class="float-left">再次输入</h4>
          <el-input class="admin-input" type="password" v-model="check_psd" placeholder="请输入内容"></el-input>
        </li>
      </ul>
    </el-card>
    <div class="back" v-if="is_revise"></div>
  </div>
  
</template>

<script>
export default {
  name: 'admin',
  components:{
  	
  },
  data () {
    return {
      admin: '',
      new_psd:'',
      old_psd:'',
      check_psd:'',
      is_revise:0
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        window.localStorage.token = '';
        this.$router.push('/adlogin');
      },
      revise(){
        this.is_revise = 1;//revise        
        this.$store.setBack(true);
        console.log(this.$store.state.is_back);
      },
      save(){
        if(this.old_psd.trim()==''){
          alert('原密码不能为空');
          return false;
        }else if(this.new_psd.trim()==''){
          alert('新密码不能为空');
          return false;
        }else if(this.new_psd !== check_psd){
          alert('两次输入不同');
          return false;
        }
        let parms ={
          oldpwd:hex_md5(this.old_psd),
          newpwd:hex_md5(this.new_psd),
          userId:localStorage.userId,
          token:localStorage.Adtoken
        }
        $.ajax({
          url:'/api/revisePsd',
          type:'post',
          dataType:'json',
          data:parms,
          success: data => {
            if(data.status == 'OK'){
              alert('修改成功');
              this.is_revise = 0;
            }else{
              alert(data.msg)
            }
          },
          error: err => {
            console.error(err);
          }
        })
      },
      exit(){
        this.is_revise = 0;
        this.$store.setBack(false);
        console.log(this.$store.state.is_back);
      },
      checkToken(){
        $.ajax({
            url:'/api/chack_token',
            type:'post',
            dataType:'json',
            data:{
              token:window.localStorage.Adtoken
            },
            success: data => {
              if(data.status=='NO'){
                  this.$router.push('/Adlogin');
                  console.log('token error')
              }
              console.log(data.msg)
            },
            error: err => {
              console.error(err)
            }
        });
      }
  },
  created(){
    document.title = '答校园用户管理系统'
  },
  mounted(){
      this.checkToken();
  },
  watch:{
    router:function(){
      this.chack_token();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding:0 0 0 10rem;
}
.nav-header{
  height: 3rem;
  /*line-height: 3rem;*/
  padding: 0 1rem;
  background: #1F2D3D;
}
.con-body{
  /*height: 33rem;*/
  margin-top: .5rem;
}
.nav-menu{
  height: 20rem;
  width: 8rem;
  background: #324157;
  position: fixed;
  left: 0;
  top:3rem;
}
.bg-purple-light {
    background: #e5e9f2;
}
.bg-purple-dark {
    background: #99a9bf;
}
.grid-content {
    min-height: 36px;
}
.list-card{
  width:100%;
  /*background: #e5e9f2;*/
}
.box-card{
  position: absolute;
  margin:10px auto;
  z-index: 1000;
  width:40%;
  left:30%;
}
.admin-input{
  margin-left:10px; 
  max-width:300px;
}
.box-card h4{
  margin: 0
}
.box-card li{
  margin-bottom: 10px;
  height: 36px;
  line-height: 36px;
}
.back{
  position: absolute;
  background: black;
  opacity: 0.5;
  width:100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.function-box{
  margin-left: 
}
</style>
