<template>
  <div class="body">
    <div class="top-box">
		<div class="user-logo float-left">
	    	<img :src="userLogo" alt="" class="fullsrc">
	    </div>
	    <span class="user-name">{{userName}}</span>
	</div>
  </div>
</template>

<script>
export default {
  name: 'UserLogo',
  components:{
  	
  },
  data () {
    return {
    }
  },
  props:{
  	userName:{
  		type:String,
  	},
  	userLogo:{
  		type:String,
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
