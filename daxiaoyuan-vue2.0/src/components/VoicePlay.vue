<template>
  <article class="ztc wrapper voice-ans">
		<i class="iconfont play" v-if="!play" @click="player">&#xe601;</i>
		<i class="iconfont play" v-if="play" @click="player">&#xe600;</i>
		<span style="float:right;margin-right:1rem;font-size:0.9rem;color:#fff">
		<!-- <audio src="./ext"></audio> -->
		{{ansTime}}</span>
  </article>
</template>

<script>
export default {
  name: 'voice-play',
  components:{
  	
  },
  data () {
    return {
      	play:false,
    }
  },
  props:{
  	ansTime:{
  		type:String,
  		default:'10:00'
  	}
  },
  methods:{
  	player(){
  		this.play=!this.play
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
