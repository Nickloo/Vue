<template>
  <div class="fullsrc" style="margin:0">
    <header class="nav-header">
      <router-link to="/admin">
        <h3 style="color:aliceblue" class="float-left">答校园用户管理</h3>
      </router-link>
      <el-button type="primary" size='mini' class="float-right" style="margin-top:.6rem" @click="logout()">登出</el-button>
      <el-button type="primary" size='mini' class="float-right" style="margin-top:.6rem;margin-right:.5rem" @click="revise()">修改</el-button>
    </header>
    <div class="con-body container">
        <nav class="nav-menu">
          <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark" router>
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
    <!--修改管理密码-->
    <div >

    </div>
    <el-card class="box-card" v-if="is_revise">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">卡片名称</span>
        <el-button style="float: right;" type="primary" @click="save()">保存</el-button>
        <el-button style="float: right;margin-right:.2rem" type="primary" @click="exit()">取消</el-button>
      </div>
      <ul>
        <li>
          <h4 class="float-left">用户名</h4>
          <el-input class="admin-input" v-model="admin" placeholder="请输入内容"></el-input>
        </li>
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
          <el-input class="admin-input" type="password" v-model="new_psd" placeholder="请输入内容"></el-input>
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
        this.is_revise = 1;        
        this.$store.setBack(true);
        console.log(this.$store.state.is_back);
      },
      save(){

      },
      exit(){
        this.is_revise = 0;
        this.$store.setBack(false);
        console.log(this.$store.state.is_back);
      }
  },
  created(){
    document.title = '答校园用户管理系统'
  },
  mounted(){
    // document.getElementsById('usermsg').click()
  },
  watch:{
    // is_revise:function(){
    //   console.log("is_revise is changed "+this.is_revise);
    //   if(this.is_revise === 1){
        
    //   }
    // }
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
</style>
