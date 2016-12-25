<template>
  <div class="que-box wrapper">
  <router-link to="/question">
	  <div class="top-box">
	  	<div class="user-logo">
	    	<img class="fullsrc" :src="data.user_logo">
	    </div>
	    <span class="user_name">{{data.user_name}}</span>
	  </div>
	  <div class="con-box over">
	  	{{data.que_con}}
	  </div>
   </router-link>
  </div>
</template>

<script>
export default {
  name: 'ask-me',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
  	data:{
  		type:Object,
  		default(){
  			return{
  				user_name:'张三',
  				user_logo:'http://img5.duitang.com/uploads/item/201508/19/20150819011950_zEJuN.jpeg',
  				que_con:'正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。',
  				que_id:'1'
  			}
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.que-box{
	width: 100%;
	height: 15.0rem;
	background: #fff;
	margin-bottom: 0.5rem;
}
.top-box{
	overflow: hidden;
	height: 5rem;
	line-height: 5rem;
	margin-top: 1rem;
	padding:0 2rem;
}
.user-logo{
	float:left;
	background: #eee;
}
.user_name{
	font-size: 1.8rem;
	margin-left: 2rem;
}
.con-box{
	margin-top: 1rem;
	padding: 0 2rem
}
.over{
	-webkit-line-clamp: 3;
}
</style>
