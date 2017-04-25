<template>
  <div id="app">
    <!-- <home></home> -->
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    
    <!-- <hello></hello> -->
    <div class="bom" v-if="is_bom"></div>
    <nav-bottom v-if="is_bom"></nav-bottom>
    <!-- hello -->
    
  </div>
  
</template>

<script>
import Hello from './components/Hello'
import Home from './pages/Home'
import Login from './pages/Login'
import NavBottom from './components/NavBottom'
export default {
  name: 'app',
  components: {
    Hello,Home,NavBottom,Login
  },
  data(){
    return{
      is_bom:true
    }
  },
  beforeUpdate(){
    
  },
  updated(){
    let pathname = window.location.pathname
    if(pathname==="/home"||pathname==="/column"||pathname==="/person"){
      this.is_bom=true
    }else{
      this.is_bom=false
    }
  },
  methods:{
    
  },
  computed: {
    // is_back () {
    //   return this.$store.state.is_back
    // }
  },
  created(){
    
  },
  mounted(){
    global.test = "55555reradsa"
    let pathname = window.location.pathname
    if(pathname==="/home"||pathname==="/column"||pathname==="/person"){
      this.is_bom=true
    }else{
      this.is_bom=false
    }
    let status = window.localStorage;
    status.consult_sta = 1;
    global.getMyque = 0;
    // global.user = JSON.parse(status.user);
  },
  watch:{
    $route:function(){
      if(this.$route.path !='/login' || this.$route.path != '/register'){
        global.userId = window.localStorage.userId;
        console.log(this.$route.path,global.userId);
        // console.log(this.$store.state);
      }
    },
  }
}
</script>

<style>
/*@import './assets/init.css'*/
/*公共样式*/
/*顶部*/
div{
  position: relative;
}
body{
  position: relative;
  font-family: "微软雅黑"
}
.half{
  width:50%;
}
.padding-bodytop{
  padding-top: 2.0rem
}
.top-1{
  margin-top: 0.05rem
}
.top-10{
  margin-top: 0.5rem
}
/*.top-bar{li
  margin-top: 3rem
}*/
.border-bottom{
  width: 100%;
  border-bottom: solid black 0.05rem;
}
.button{
  height: 1.8rem;
  width: 3.8rem;
  line-height: 1.8rem;
  text-align: center;
  border-radius: 0.5rem;
  font-weight: 600;
  color: #fff;
}
/*底部button*/
.button-bot{
  position: fixed;
  bottom: 0;
  height: 2.5rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  font-weight: 600;
  color: #fff;
  font-size: 1.0rem;
}
.div-center{
  margin:0 auto;
}
/*.main{
  background: #fff;
  overflow: hidden;
}*/
.width-max{
  width: 100%;
}
/*距离上部NavHeader*/
.top-bar{
  margin-top: 3.0rem
}
.padding-20{
  padding:0 1.0rem;
}
.padding-10{
  padding:0 0.5rem;
}
.padding-10-10{
  padding:.5rem .5rem;
}
.padding-20-20{
  padding:1rem 1rem;
}
.float-left{
  float: left;
}
.float-right{
  float: right;
}
.main{
  background: #fff
}
.body-top{
  margin-top: 2rem;
}
.wrapper{
  overflow:hidden; 
  /*display :relative;*/
}
.title-font{
  font-size: 1.0rem;
}
.ztc{
  background: #2b8ff7;
}
.text-color{
  color: #919ba6;
}
/*头像样式*/
.user-logo{
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 2.5rem;
  overflow: hidden;
  background: #eee;
  float: left;
}
/*带有头像的上部*/
.logo-top{
  height: 2.5rem;
  line-height: 2.5rem
}
.bom{
  overflow: hidden;
  margin-bottom: 3rem;
}
.text-center{
  text-align:center;
}
.fullsrc{
  height: 100%;
  width: 100%;
}
/*文本溢出省略号*/
.over{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; 
  /*white-space: nowrap;*/
}
/*50%宽度*/
.width-50{
  width: 50%
}
/*25%宽度*/
.width-25{
  width: 25%
}
/*App样式*/
#app{
  width:100%;
  height: 100%;
  /*padding: -0.5rem*/
}
/*.back{
  position:absolute;
  top:0;
  width:100%;
  height:100%;
  z-index: 11;
  background-color: black;
  opacity:0.5;
}*/
a {
    text-decoration: none;
    /** 去除阴影*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
a{
  color: #000
}
input,button,select,textarea{
  outline:none
}
body{
  position: relative;
}
input:focus{
    border:0;
}
textarea{
  border: 0
}
button{
  border:0rem
}
ul {
    overflow: hidden;
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
    margin:0
}
/*h1,h2,h3,h4{
  margin:0
}*/
</style>
