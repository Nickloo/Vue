<template>
  <div >
    <!--<router-link>-->
        <div class="logo-top wrapper">
            <div class="user-logo wrapper" style="float:left">
                <img :src="userLogo" style="height:100%;width:100%">
            </div>
            <div class="ans-uname title-font">{{username}} 的回答</div>
            <div class="best-ans float-right" v-if = "isBest === 1">最佳答案</div>
            <div class="best-ans float-right" v-if = "isBest === 0">设为最佳答案</div>
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
	<article class="wrapper txt-ans content" v-if="isVoice==0">
		{{textCon}}
	</article>
  </div>
</template>

<script>
export default {
  name: 'ans-list',
  components:{
  	
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    username:'',
    userLogo:'',
    isVoice:'',
    anwsTime:'',
    textCon:'',
    voiceSrc:'',
    isBest:{type:Number,default:1}
  }
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
	font-size: 0.75rem;
}
.ans-uname{
	float:left;
	margin-left:1rem;
}
.best-ans{
    /*position: absolute;*/
    border: solid 1px blue;
    border-radius: .5rem;
    padding: .1rem .5rem;
    /*display: -webkit-box;*/
    font-size: .4rem;
    height: 1rem;
    line-height: 1rem
    /*overflow: hidden;    */
}
</style>
