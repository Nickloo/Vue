<template>
  <div class="que-box wrapper">
  <router-link :to="{name:'quecon',params:{que_id:data.que_id}}">
	  <div v-if="data.is_private == 1" class="top-box">
	  	<!--<div class="user-logo">
	    	<img class="fullsrc" :src="data.user_logo">
	    </div>-->
	    <span class="user-name title-font">{{data.username}}的提问</span>
	  </div>
	  <h3 class="con-box over">
	  	{{data.title}}
	  </h3>
		<div class="con-box over" v-if="data.is_private == 0">
	  	{{data.content}}
	  </div>
   </router-link>
	 <div class="date">{{data.que_date}}</div>
  </div>
</template>

<script>
export default {
  name: 'ask-me',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
  	data:{
  		type:Object,
  		default(){
  			return{
  				user_name:'',
  				user_logo:'',
  				que_con:'',
  				que_id:''
  			}
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.que-box{
	background: #fff;
	margin-bottom: 0.25rem;
	padding:1rem 1rem .5rem 1rem
}
.top-box{
	overflow: hidden;
	height: 2.5rem;
	line-height: 2.5rem;
}
.user-logo{
	float:left;
	background: #eee;
}
.user-name{
	/*margin-left: 1rem;*/
	font-weight: 600;
}
.con-box{
	margin-top: 0.5rem;
}
.over{
	-webkit-line-clamp: 3;
}
.date{
	float:right
}
</style>
