<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
    <!-- <hello></hello> -->
    <div class="bom"></div>
    <nav-bottom v-if="!islogin"></nav-bottom>
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
      islogin:true
    }
  },
  beforeUpdate(){
    
  },
  updated(){
    let pathname = window.location.pathname
    if(pathname==="/login"||pathname==="/register"){
      this.islogin=true
    }else{
      this.islogin=false
    }
  },
  mounted(){
    let pathname = window.location.pathname
    if(pathname==="/login"||pathname==="/register"){
      this.islogin=true
    }else{
      this.islogin=false
    }
  },
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
}
.top-1{
  margin-top: 0.05rem
}
.top-bar{
  margin-top: 3rem
}
.button{
  /*float: left;*/
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
.float-left{
  float: left;
}
.main{
  background: #fff;
}
.width-max{
  width: 100%;
}
/*距离上部NavHeader*/
.top-bar{
  margin-top: 2.0rem
}
.padding-20{
  padding:0 1.0rem;
}
.padding-10{
  padding:0 0.5rem;
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
.user-logo{
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 2.5rem;
  overflow: hidden;
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
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
/*App样式*/
#app{
  width:100%;
  height: 100%;
  /*padding: -0.5rem*/
}
a {
    text-decoration: none;
    /** 去除阴影*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &:hover, &:active {
      text-decoration: none;
    }
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

</style>
