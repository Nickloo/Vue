<template>
  <div>
    <router-link to="/person" v-for="data in datas">
    	<div class="padding-20-20 fans-card main">
    		<div class="logo-top">
    			<div class="user-logo">
    				<img class="fullsrc" :src="data.fans_logo" alt="">
    			</div>
    			<span class="fans-name">{{data.fans_name}}</span>
    		</div>
    		<!--<div class="profile">
    			{{data.introduction}}
    		</div>-->
    	</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'people_list',
  components:{
  	
  },
  data () {
    return {
     
    }
  },
  props:{
  	datas:{
  		type:Array,
  		// default(){
  		// 	return[]
  		// }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fans-card{
	/*height: 6rem;*/
	padding-bottom: 0.5rem;
	margin-bottom:0.1rem 
}
.fans-name{
	float:left;
	margin-left:1rem;
	font-size: 1rem;
}
.profile{
	margin-top: 0.6rem
}
</style>
