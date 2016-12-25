<template>
  <div id="app">
    <!-- <home></home> -->
    <router-view></router-view>
    <!-- <hello></hello> -->
    <nav-bottom></nav-bottom>
    <!-- hello -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import Home from './pages/Home'
import NavBottom from './components/NavBottom'
export default {
  name: 'app',
  components: {
    Hello,Home,NavBottom
  }
}
</script>

<style>
/*@import './assets/init.css'*/
/*公共样式*/
.wrapper{
  overflow:hidden; 
  /*display :relative;*/
}
.ztc{
  background: #2b8ff7;
}
.user-logo{
  height: 5rem;
  width: 5rem;
  border-radius: 5rem;
  overflow: hidden;
}
.bom{
  overflow: hidden;
  margin-bottom: 6rem
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
</style>
