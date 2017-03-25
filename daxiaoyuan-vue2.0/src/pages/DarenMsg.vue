<template>
  <div class="top-bar">
    <nav-header title="答人详情" :back="true"></nav-header>
	<div class="daren-box main">
		<user-logo user-name="Nick" user-logo=""></user-logo>
		<div class="introduct top-10">
			123
		</div>
	</div>
	<div class="drmsg-tag">他的回答</div>
	<div class="daren-que main" v-for="item in datas">
		<que-list :isbot="false" :item="item" :is-over="true"></que-list>
	</div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import QueList from '../components/QueList'
import UserLogo from '../components/UserLogo'
export default {
  name: 'darenmsg',
  components:{
  	NavHeader,QueList,UserLogo
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      datas:[
      		{
    			user_name:'Tom',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd17324430.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。',
    			que_id:'1',
    			fav_num:'1',
          ans_type:1
    		},
  		  	{
    			user_name:'Lisa',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd14132626.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
    			que_id:'1',
    			fav_num:'1',
          ans_type:2
    		},
    		{
    			user_name:'Jay',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd118987818.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
    			que_id:'1',
    			fav_num:'1',
          ans_type:1
    		}
    	]
    }
  },
  mounted(){
  	console.log('************',this.$route.params.userId)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.daren-box{
	/*width: 100%;*/
	padding:0.5rem 1.0rem;
}
.drmsg-tag{
	margin-top:1rem;
	margin-bottom:1rem;
	font-size: 0.75rem
}
.daren-que{

}
</style>
