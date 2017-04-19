<template>
  <div class="body wrapper">
    <nav-header title="问答详情" :back="true"></nav-header>
    <div class="que-con-box wrapper main top-bar padding-20-20">
			<h4>{{que_title}}</h4> 	
	    <article class="ans_txt">
	    		{{que_con}}
	    </article>
    </div>
		<div class="padding-20" style="margin-top:1rem">最佳答案</div>
    <div class="ans-con-box wrapper main">
    	<div class="logo-top">
	    	<router-link :to="{name:'darenmsg',params:{userId:ans_userId}}" class="user-logo">
	    		<img :src="ans_user_logo" alt="" class="fullsrc">
	    	</router-link>
	    	<div class="u-name float-left">{{ans_username}} 的回答</div>
	    </div>
	    <article class="ans_txt" v-if="is_voice===0">
	    		{{ans_con}}
	    </article>
	    <voice-play :ans-time="ans_time" v-if="is_voice===1"></voice-play>
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
			que_title:'',
      que_con:'',
			ans_user_logo:'',
			ans_username:'',
      is_voice:'',
			voice_src:'',
			ans_con:'',
			ans_userId:'',
			favColor:'',
			fav_num:''
    }
  },
  mounted(){
  	if(this.is_fav){
  		this.favColor="red"
  	}else{
  		this.favColor="#000"  	
  	}
		this.getQue();
		this.getMsg();
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
  	},
		getMsg(){
			$.ajax({
				url:'/api/getClassics/que',
				type:'get',
				dataType:'json',
				cache:'true',
				crossDomain:true,
				data:{
					que_id:this.$route.params.id
				},
				success:(data) => {
					let datas = data.data;
					this.ans_user_logo = datas.ans_user_logo;
					this.ans_username = datas.ans_username;
					this.ans_userId = datas.answer_user_id;
					this.is_voice = datas.is_voice;
					this.voice_src = datas.voice_src;
					this.ans_con = datas.ans_con;
					this.fav_num = datas.fav_num;
				}
			})
		},
		getQue(){
			$.ajax({
				url:'/api/getQuestion/queCon',
				type:'get',
				dataType:'json',
				data:{
					que_id:this.$route.params.id
				},
				success:(data) => {
					this.que_title = data.data.title;
					this.que_con = data.data.content;
				}
			})
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.que-con-box{
	/*padding:0.8rem 0.8rem;*/
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
	/*margin-left: 0.75rem;*/
}
.fav-logo{
	float:right;
	/*margin-right: 0.5rem;*/
	font-size: 0.8rem;
}
</style>
