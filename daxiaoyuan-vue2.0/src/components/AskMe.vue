<template>
  <div class="que-box wrapper">
  <router-link :to="{name:'quecon',params:{que_id:data.que_id}}">
	  <div class="top-box">
	  	<div class="user-logo">
	    	<img class="fullsrc" :src="data.user_logo">
	    </div>
	    <span class="user_name title-font">{{data.username}}</span>
	  </div>
	  <div class="con-box over">
	  	{{data.title}}
	  </div>
		<!--<div class="con-box over">
	  	{{data.content}}
	  </div>-->
   </router-link>
	 <div class="date">{{data.que_date}}</div>
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
	background: #fff;
	margin-bottom: 0.25rem;
	padding:1rem 1rem .5rem 1rem
}
.top-box{
	overflow: hidden;
	height: 2.5rem;
	line-height: 2.5rem;
}
.user-logo{
	float:left;
	background: #eee;
}
.user_name{
	margin-left: 1rem;
	font-weight: 600;
}
.con-box{
	margin-top: 0.5rem;
}
.over{
	-webkit-line-clamp: 3;
}
.date{
	float:right
}
</style>
