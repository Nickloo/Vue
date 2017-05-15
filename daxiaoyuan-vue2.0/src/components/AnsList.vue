<template>
  <div >
    <!--<router-link>-->
        <div class="logo-top wrapper">
            <div class="user-logo wrapper" style="float:left">
                <img :src="userLogo" style="height:100%;width:100%">
            </div>
            <div class="ans-uname title-font">{{username}} 的回答</div>
            <div class="best-ans float-right" v-if = "control" @click="handlClick">{{best==1?'有用答案':'设为有用答案'}}</div>
        </div>
    <!--</router-link>-->
	<!-- 语音回答 -->
	<article class="ztc wrapper voice-ans" v-if="isVoice==1">
		<i class="iconfont play" v-if="!play" @click="player">&#xe601;</i>
		<i class="iconfont play" v-if="play" @click="player">&#xe600;</i>
		<span style="float:right;margin-right:1rem;font-size:0.9rem;color:#fff">
		<!-- <audio src="./ext"></audio> -->
		{{anwsTime}}</span>
	</article>
	<!-- 文字回答 -->
	<article class="wrapper txt-ans content over" v-if="!isVoice&&isOver==true">
		{{textCon}}
	</article>
  <article class="wrapper txt-ans content" v-if="!isVoice&&isOver==false">
		{{textCon}}
	</article>
  <time v-if="date" style="float:right">{{date}}</time>
  </div>
</template>

<script>
export default {
  name: 'ans-list',
  components:{
  	
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      best:0
    }
  },
  props:{
    control:'',
    username:'',
    userLogo:'',
    isVoice:'',
    anwsTime:'',
    textCon:'',
    voiceSrc:'',
    isBest:{type:Number,default(){
      return 0
    }},
    date:null,
    ansId:'',
    isOver:{type:Boolean,default(){
      return true
    }},
  },
  mounted(){
    this.best = this.isBest
  },
  methods:{
    handlClick(){
      if(this.best === 0){
        this.setBest(this.ansId);
        this.best = 1;
      }else{
        // this.delBest(this.ansId)
      }
    },
    setBest(ansId){
      if(confirm("设置有用后此问题将不能再被回答，确定设置？") === true){
        $.ajax({
          url:'/api/setbest',
          type:'post',
          dataType:'json',
          data:{ans_id:ansId},
          success:(data) => {
            if(data.status === 'OK'){
              this.best = 1
            }
          },
          error:(Error) => {
            console.err(Error);
          }
        });
      }
    },
    delBest(ansId){
      $.ajax({
        url:'/api/delbest',
        type:'post',
        dataType:'json',
        data:{ansId:ansId},
        success:(data) => {
          if(data.status === 'OK'){
            this.best = 0
          }
        },
        error:(Error) => {
          console.err(Error);
        }
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
    padding:0
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
.content{
	margin-top:0.5rem; 
	font-size: 17px;
}
.ans-uname{
	float:left;
	margin-left:1rem;
}
.best-ans{
    border: solid 1px #2b8ff7;
    border-radius: .5rem;
    background: #2b8ff7;
    color:#fff;
    padding: .1rem .5rem;
    font-size: .5rem;
    height: 1rem;
    line-height: 1rem
}
</style>
