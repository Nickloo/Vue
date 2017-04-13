<template>
  <div class="padding-bodytop">
    <nav-header title="我的关注" :back="true"></nav-header>
    <daren-list ></daren-list>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import PeopleList from '../components/PeopleList'
import DarenList from '../components/DarenList'
export default {
  name: 'follow',
  components:{
  	NavHeader,PeopleList,DarenList
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
      	}
    	]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
