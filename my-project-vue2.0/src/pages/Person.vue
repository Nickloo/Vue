<template>
  <div class="body wrapper">
  	<nav-header title="个人"></nav-header>
    <div class="top-card text-center">
    	<div class="per-logo">
    		<img class="fullsrc" :src="per_logo" alt="">
    	</div>
    	<div class="per-name">{{user_name}}</div>
    	<div class="card-bom">
    		<div class="sel-box">
    			<div>{{fans_num}}</div>
    			<div style="margin-top:1rem">粉丝</div>
    		</div>
    		<div class="sel-box">
    			<div>{{fav_num}}</div>
    			<div style="margin-top:1rem">关注</div>
    		</div>
    		<div class="sel-box">
    			<div>{{listen_num}}</div>
    			<div style="margin-top:1rem">听过</div>
    		</div>
    		<div class="sel-box">
    			<div>{{ans_num}}</div>
    			<div style="margin-top:1rem">回答</div>
    		</div>
    	</div>
    </div>
    <div class="bom-card">
    	<div class="sel-page text-center" :class="{ active: index == 0 }" @click="changPage(0)">
    		向我提问
    	</div>
    	<div class="sel-page text-center" :class="{ active: index == 1 }" @click="changPage(1)">
    		提问
    	</div>
    </div>
    <div class="ask-me" v-for="ask_data in ask_datas">
      <ask-me v-if="index == 0" :data="ask_data"></ask-me>
    </div>
    <ask-card v-if="index == 1"></ask-card>
    <div class="bom"></div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import AskCard from '../components/AskCard'
import AskMe from '../components/AskMe'
export default {
  name: 'person',
  components:{
  	NavHeader,AskCard,AskMe
  },
  data () {
    return {
      user_name: 'Nickloong',
      per_logo:"http://www.zhiyinmusic.cn/cimg/bd17324430.jpg",
      fans_num:2,
      fav_num:3,
      listen_num:8,
      ans_num:2,
      index:0,
      ask_datas:[
        {
          user_name:'张三',
          user_logo:'http://img5.duitang.com/uploads/item/201508/19/20150819011950_zEJuN.jpeg',
          que_con:'正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。',
          que_id:'1'
        },
        {
          user_name:'李四',
          user_logo:'http://img5.duitang.com/uploads/item/201508/19/20150819011950_zEJuN.jpeg',
          que_con:'正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。',
          que_id:'2'
        },
        {
          user_name:'王五',
          user_logo:'http://img5.duitang.com/uploads/item/201508/19/20150819011950_zEJuN.jpeg',
          que_con:'正如其名，vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。',
          que_id:'3'
        }
      ]
    }
  },
  methods:{
  	changPage(id){
  		this.index=id
  		// this.$router.push('/home')
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-card{
	overflow: hidden;
	height: 26rem;
	background: #fff;
	padding-top:2.5rem;
}
.per-logo{
	height:10.0rem;
	width: 10.0rem;
	border-radius: 10.0rem;
	background: #eee;
	margin:0 auto;
}
.per-name{
	font-size: 2rem;
	margin-top: 1.0rem
}
.card-bom{
	padding-top: 0.5rem;
	width:100%;
	/*background: blue;*/
	height: 7rem;
	margin-top:5rem;
}
.sel-box{
	float: left;
	height: 100%;
	width: 25%;
	text-align:center;
	font-size: 1.8rem;
	/*background: red*/
}
.bom-card{
	/*overflow: hidden;*/
	width:100%;
	margin-top: 2.5rem;
	height: 5rem;
	line-height: 5rem;
	background: #fff;
	font-size: 1.8rem
}
.sel-page{
	float:left;
	height: 100%;
	width:50%;	
}
.active{
	border-bottom: 0.1rem solid blue
}
</style>
