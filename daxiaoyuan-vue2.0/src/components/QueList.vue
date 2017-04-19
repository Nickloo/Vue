<template>
  <div class="wrapper body que-list">
  <router-link :to="{name:'wenda',params:{id:item.que_id}}">
	<h3 class="content padding-10" :class="{over:isOver}">
	    	{{item.que_title}}
	</h3>
	<div class="border-bottom" style="margin-top:0.5rem"></div>
	</router-link>
	<ans-list :username="item.ans_username" :user-logo="item.ans_user_logo" :is-voice="item.is_voice"
				:textCon="item.ans_con"></ans-list>
	<div class="bottom" v-if="isbot">
		<span class="fav">{{item.fav_num}}人觉得很赞</span>
		<i class="iconfont fav-logo" :style="{color:favColor}" @click="fav">&#xe668;</i>
	</div>
  </div>
</template>

<script>
import AnsList from "../components/AnsList"
export default {
  name: 'que-list',
  components:{
	  AnsList
  },
  data () {
    return {
    	play:false,
    	favColor:'',
    	anws_time:'1:00',
    	isVoice:true,
    }
  },
  props:{
  	item:{
  		type:Object,
  		default(){
  			return{

  			}
  		}
  	},
  	is_fav:1,
  	isbot:'',
  	isOver:{type:Boolean,default:true},
  },
  created(){
  },
  mounted(){
  	if(this.is_fav===0){
  		this.favColor="#000"
  	}else{
  		this.favColor="red"  	
	}
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
  	},
	getUser(){

	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	/*height: 10.5rem;*/
	background: #fff;
	margin-top: 0.25rem;
	padding: 1rem;
}
.user-name{
	float:left;
	margin-left:1rem;
}
.ans-uname{
	float:right;
	margin-right:1rem;
}
.content{
	margin-top:0.5rem; 
	font-size: 0.75rem;
	/*height: 4.1rem;*/
	/*padding-left: 0.5rem;
	padding-right: 0.5rem;*/
	/*margin-left:2rem;*/
}
.border-bottom{
	margin-bottom: 0.5rem;
	border-color: #2b8ff7
}
.voice-ans{
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
	/*margin-left: 0.75rem;*/
}
.fav-logo{
	float:right;
	margin-right: 0.5rem;
	font-size: 0.8rem;
}
</style>
