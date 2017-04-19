<template>
  <div class="padding-bodytop">
    <nav-header title="我的关注" :back="true"></nav-header>
    <div class="daren wrapper" v-for="item in datas">
      <daren-list :data="item"></daren-list>
    </div>
    
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
    	]
    }
  },
  mounted(){
    $.ajax({
      url:'/api/getFollows',
      type:'get',
      dataType:'json',
      crossDomain:'true',
      data:{
        userId:window.localStorage.userId
      },
      success:(data) => {
        this.datas = data.data
      },
      error:(Error) => {
        console.log(Error.toString())
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
