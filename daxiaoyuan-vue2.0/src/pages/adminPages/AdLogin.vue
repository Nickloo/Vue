<template>
  <div class="body">
    <div class="card-body">
        <ul>
            <li style="color:#fff">
                管理员登陆
            </li>
            <li>
                <tag style="color:#fff">用户名</tag>
                <el-input placeholder="用户名" v-model="username">
                </el-input>
            </li>
            <li>
                <tag style="color:#fff">管理密码</tag>
                <el-input placeholder="管理密码" v-model="password">
                </el-input>
            </li>
            <li class="float-right">
                <el-button type="primary" @click="login()">登陆</el-button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ad-login',
  components:{
  	
  },
  data () {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    login(){
        this.$router.push('/admin')
    }
  },
  mounted(){
      document.body.style.background = '#99A9BF'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
    padding:10% 20%;
}
.card-body{
    margin:0 auto;
    padding: 10px 30px;
    width: 300px;
    height: 200px;
    background: #324057;
    border-radius: 6px}
.card-body li {
    height: 40px;
    line-height: 40px
}
.el-input{
    width: 230px;
    float: right
}
.body li{
    margin: 10px 0 0 0
}
</style>
