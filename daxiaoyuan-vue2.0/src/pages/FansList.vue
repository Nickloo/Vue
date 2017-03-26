<template>
  <div class="padding-bodytop">
    <nav-header title="我的粉丝" :back="true"></nav-header>
    <!-- <router-link to="/person" v-for="data in datas">
    	<div class="padding-20 fans-card main">
    		<div class="logo-top" style="margin-top:0.5rem">
    			<div class="user-logo">
    				<img class="fullsrc" src="" alt="">
    			</div>
    			<span class="fans-name">{{data.fans_name}}</span>
    		</div>
    		<div class="profile">
    			{{data.fans_profile}}
    		</div>
				123
    	</div>
    </router-link> -->
    <people-list :datas="datas"></people-list>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import PeopleList from '../components/PeopleList'
export default {
  name: 'fans_list',
  components:{
  	NavHeader,PeopleList
  },
  data () {
    return {
      datas:[
      	{
      		fans_name:"Tom",
      		fans_profile:"wod",
          user_logo:""	
      	},
      	{
      		fans_name:"Tom",
      		fans_profile:"wod",	
      	},
      	{
      		fans_name:"Tom",
      		fans_profile:"wod",	
      	}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fans-card{
	height: 6rem;
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
