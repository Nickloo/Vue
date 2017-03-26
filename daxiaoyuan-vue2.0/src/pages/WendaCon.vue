<template>
  <div class="body wrapper">
    <nav-header title="问答详情" :back="true"></nav-header>
    <div class="que-con-box wrapper main top-bar"> 	
	    <div class="logo-top">
	    	<div class="user-logo">
	    		<img src="132" alt="" class="fullsrc">
	    	</div>
	    	<div class="u-name float-left"> 的提问</div>
	    </div>
	    <article class="ans_txt">
	    		{{que_con}}最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加
	    </article>
    </div>
    <div class="ans-con-box wrapper main">
    	<div class="logo-top">
	    	<router-link :to="{name:'darenmsg',params:{userId:ans_uid}}" class="user-logo">
	    		<img src="132" alt="" class="fullsrc">
	    	</router-link>
	    	<div class="u-name float-left"> 的回答</div>
	    </div>
	    <article class="ans_txt" v-if="ans_type===2">
	    		{{ans_con}}最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加
	    </article>
	    <voice-play :ans-time="ans_time" v-if="ans_type===1"></voice-play>
	    <div class="bottom">
			<span class="fav">{{fav_num}}人觉得很赞</span>
			<i class="iconfont fav-logo" :style="{color:favColor}" @click="fav">&#xe668;</i>
		</div>
    </div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import VoicePlay from '../components/VoicePlay'
export default {
  name: 'wendacon',
  components:{
  	NavHeader,VoicePlay
  },
  data () {
    return {
      que_con:"123",
      ans_con:"456",
      ans_type:1,
      fav_num:3,
      is_fav:0,
      favColor:'',
      ans_uid:2,
      ans_time:'15:00'
    }
  },
  mounted(){
  	if(this.is_fav===0){
  		this.favColor="#000"
  	}else{
  		this.favColor="red"  	
  	}
  },
  methods:{
  	fav(){
  		if (this.favColor=='red') {
  			this.favColor="#000";
  			this.fav_num--;
  		}else{
  			this.favColor="red";
  			this.fav_num++;
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.que-con-box{
	padding:0.5rem 0.5rem;
}
.u-name{
	margin-left: 1rem
}
.ans-con-box{
	margin-top: 1.0rem;
	padding:0.5rem 0.5rem;
}
.ans_txt{
	margin-top: 1.0rem
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
