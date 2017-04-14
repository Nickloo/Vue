<template>
  <div class="padding-bodytop">
    <nav-header title="我的粉丝" :back="true"></nav-header>
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
      ]
    }
  },
	mounted(){
		this.getFan();
	},
	methods:{
		getFan(){
			$.ajax({
				url:'/api/getfans',
				type:'get',
				dataType:'json',
				crossDomain: true,
        cache: true,
				async:true,
				data:{
					user_id:JSON.parse(window.localStorage.user).userId
				},
				success:(data) => {
					this.datas = data.data;
					console.log(this.datas)
				},
				error:(Error) => {
					console.error(Error)
				},
				
			})
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
