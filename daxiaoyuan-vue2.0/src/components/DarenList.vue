<template>
  <div class="body wrapper main">
	<div class="top-box">
		<router-link :to="{name:'darenmsg',params:{userId:data.userId}}" class="user-logo float-left">
	    	<img :src="data.user_logo" alt="" class="fullsrc">
	    </router-link>
	    <span class="user-name">{{data.username}}</span>
	    <span class="fans-num">{{data.fans_num}}人关注</span>
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
      userId:'123'
    }
  },
  props:{
  	data:{
  		type:Object,
  		default(){
  			return{

  			}
  		}
  	}
  },
	mounted(){
		console.log(this.data.userId+'************************')
	//  this.userId = this.data.userId
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	position: relative;
	min-height: 5rem;
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
.fans-num{
	float: right
}
.introduct{
	/*height: 1.8rem;*/
	overflow: hidden;
	margin-top: 0.5rem;
	-webkit-line-clamp: 2;
}
</style>
