<template>
  <div class="body top-bar">
    <nav-header title="我的提问"  :back="true"></nav-header>
    <!--<selection>asdfasf</selection>-->
    <div class="que-card main wrapper padding-10-10">
      <user-logo :user-name="user.username" :user-logo="user.user_logo"></user-logo>
      <ul>
        <li>
          <h3>{{queData.title}}</h3>
        </li>
        <li>
          <section>{{queData.content}}</section>
        </li>
        <li style="margin-top:.5rem">
          <section class="float-right">{{queData.que_date}}</section>
        </li>
      </ul>
    </div>
    <div class="ans-list">
      <ans-list></ans-list>
    </div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import UserLogo from '../components/UserLogo'
import AnsList from '../components/AnsList'
export default {
  name: 'my-quecon',
  components:{
  	NavHeader,UserLogo,AnsList
  },
  data () {
    return {
      queData:{},
      que_title:'',
      que_con:'',
      que_date:'',
      user:{}
    }
  },
  created(){
    
  },
  mounted(){
    this.user = JSON.parse(window.localStorage.user)
    this.getQue();
  },
  methods:{
    getQue:function(){
      $.ajax({
        url:'/api/getQuestion/queCon',
        type:'get',
        dataType:'json',
        data:{que_id:this.$route.params.que_id},
        success:function(data){
          this.queData = data.data
        }.bind(this)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
