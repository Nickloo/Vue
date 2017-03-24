<template>
  <div class="body wrapper main">
	<div class="top-box">
		<router-link :to="{name:'darenmsg',params:{userId:testId}}" class="user-logo float-left">
	    	<img :src="data.user_logo" alt="" class="fullsrc">
	    </router-link>
	    <span class="user-name">{{data.user_name}}</span>
	    <span class="fav-num">{{data.fav_num}}人关注</span>
	</div>
	<div class="introduct over">
		{{data.introduction}}
	</div>
  </div>
</template>

<script>
export default {
  name: 'daren-list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      testId:'123'
    }
  },
  props:{
  	data:{
  		type:Object,
  		default(){
  			return{
  				user_logo:"http://www.zhiyinmusic.cn/cimg/bd17324430.jpg",
  				user_name:"Tom",
  				introduction:"正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。",
  				fav_num:"2",
  				id:'123'
  			}
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	position: relative;
	height: 5rem;
	padding:0.5rem 1rem;
	margin-bottom: 0.25rem
}
.user-logo{
	background: #eee
}
.top-box{
	height: 2.5rem;
	line-height: 2.5rem;
}
.user-name{
	margin-left: 1rem;
	font-size: 1rem;
	font-weight: 600
}
.fav-num{
	float: right
}
.introduct{
	/*height: 1.8rem;*/
	overflow: hidden;
	margin-top: 0.5rem;
	-webkit-line-clamp: 2;
}
</style>
