<template>
  <div style="margin:0">
    <header class="nav-header">
      <h3 style="color:aliceblue" class="float-left">答校园用户管理</h3>
      <el-button type="primary" class="float-right" style="margin-top:.6rem" @click="logout()">登出</el-button>
    </header>
    <div class="con-body container">
        <nav class="nav-menu">
          <el-menu default-active="2" class="el-menu-vertical-demo" theme="dark" router>
            <el-submenu index="1">
              <template slot="title" id="usermsg">用户管理</template>
                <el-menu-item index="/admin/users" >用户信息管理</el-menu-item>
                <el-menu-item index="/admin/userapply">用户申请管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin/question">问答管理</el-menu-item>
          </el-menu>
        </nav>
        <div class="list-card float-right">
          <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  components:{
  	
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
      }
  },
  created(){
    document.title = '答校园用户管理系统'
  },
  mounted(){
    // document.getElementsById('usermsg').click()
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
</style>
