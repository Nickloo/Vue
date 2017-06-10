<template>
  <div class="body">
    <div class="card-body">
        <ul>
            <li style="color:#fff">
                管理员登陆
            </li>
            <li>
                <span style="color:#fff">用户名</span>
                <el-input placeholder="用户名" v-model="username">
                </el-input>
            </li>
            <li>
                <span style="color:#fff">管理密码</span>
                <el-input type="password" placeholder="管理密码" v-model="password">
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
        $.ajax({
            url:'/api/login',
            type:'post',
            dataType:'json',
            data:{
                user_name:this.username,
                password:hex_md5(this.password),
                type:'admin'
            },
            success:(data) => {
                if(data.status === 'OK'){
                    console.log(data.data)
                    if(data.data.identy===2){
                        this.$router.push('/admin/function');
                        window.localStorage.Adtoken = data.data.token;
                        window.localStorage.userId = data.data.userId;
                    }else{
                        alert('该管理员用户不存在')
                    }
                }else{
                    // if(data.data.identy!=="2"){
                        // alert('不是管理员用户');
                    // }else{
                        alert(data.msg);
                    // }
                }
            },error:(err) => {
                console.error(err)
            }
        })
    }
  },
  created(){
    document.title = '答校园用户管理系统登陆'
  },
  mounted(){
      document.body.style.background = '#99A9BF'
  }
}
</script>

<!-- Add "scoped" name attribute to limit CSS to this component only -->
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
