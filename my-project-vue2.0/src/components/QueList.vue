<template>
  <div class="wrapper body que-list" >
  	<div class="top wrapper">
	  	<div class="user-logo wrapper" >
	    	<img :src="item.user_logo" style="height:100%;width:100%">
	    </div>
	    <div class="user-name">{{item.user_name}}</div>
	</div>
	<div class="content over">
	    	{{item.que_content}}
	</div>
	<div class="answer ztc wrapper">
		<i class="iconfont play" v-if="!play" @click="player">&#xe601;</i>
		<i class="iconfont play" v-if="play" @click="player">&#xe600;</i>
		<span style="float:right;margin-right:1rem;font-size:0.9rem;color:#fff">12:00</span>
	</div>
	<div class="bottom">
		<span class="fav">{{item.fav_num}}人觉得很赞</span>
		<i class="iconfont fav-logo" :style="{color:favColor}" @click="fav">&#xe668;</i>
	</div>
  </div>
</template>

<script>
export default {
  name: 'que-list',
  data () {
    return {
    	play:false,
    	favColor:''
    }
  },
  props:{
  	item:{
  		type:Object,
  		default:{
  				user_name:'Tom',
  				user_logo:'http://www.zhiyinmusic.cn/cimg/bd17324430.jpg',
  				que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
  				que_id:'1',
  				fav_num:'1',
  			}
  	},
  	is_fav:1
  },
  mounted(){
  	if(this.is_fav===0){
  		this.favColor="#000"
  	}else{
  		this.favColor="red"  	}
  },
  methods:{
  	player(){
  		this.play=!this.play
  	},
  	fav(){
  		if (this.favColor=='red') {
  			this.favColor="#000"
  		}else{
  			this.favColor="red"
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	height: 10.5rem;
	background: #fff;
	margin-top: 0.25rem;
	padding: 1rem;
}
.top{
	height: 2.5rem;
	line-height: 2.5rem;
	width:100%;
}
.user-logo{
	float:left;
	/*margin-left: 1.0rem;*/
	background:#eee
}
.user-name{
	float:left;
	font-size: 1rem;
	margin-left:1rem;
}
.content{
	margin-top:0.5rem; 
	font-size: 0.75rem;
	height: 3.5rem;
}
.answer{
	margin-top:0.5rem; 
	height:2.0rem;
	line-height: 2.0rem;
	width:100%;
	border-radius: 0.75rem;
	overflow: hidden;
	
}
.play{
	margin-left:1rem;
	margin-top: 0.5rem;
	font-size: 1.25rem;
	color:#fff;
}
.bottom{
	width: 100%;
	/*height: 100%;*/
	margin-top: 0.5rem
}
.fav{
	float:left;
	margin-left: 0.75rem;
}
.fav-logo{
	float:right;
	margin-right: 0.5rem;
	font-size: 0.8rem;
}
</style>
