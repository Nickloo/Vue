<template>
  <div class="body padding-bodytop">
    <nav-header title="我的提问"  :back="true"></nav-header>
    <!--<selection>asdfasf</selection>-->
    <div class="que-card main wrapper padding-10-10">
      <!--<user-logo :user-name="user.username" :user-logo="user.user_logo"></user-logo>-->
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
    <!--{{$store.state.setStatus}}-->
    <div class="ans-list main wrapper padding-20-20" v-for="item in ansData">
      <ans-list :username="item.username" :user-logo="item.user_logo" :is-voice="item.is_voice"
				:textCon="item.ans_con" :date="item.ans_date" :is-best="item.is_best" :ans-id="item.ans_id" :control="true"></ans-list>
    </div>
    <!--<div class="ans-list main wrapper padding-20-20" v-for="item in ansData" v-if="queData.best_id!=0">
      <ans-list :username="item.username" :user-logo="item.user_logo" :is-voice="item.is_voice"
				:textCon="item.ans_con" :date="item.ans_date" :is-best="item.is_best" :ans-id="item.ans_id" :control="item.is_best==1?true:false"></ans-list>
    </div>-->
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
      user:{},
      ansData:[]
    }
  },
  mounted(){    
    this.getQue();
    this.getAns();
  },
  methods:{
    getQue(){
      $.ajax({
        url:'/api/getQuestion/queCon',
        type:'get',
        dataType:'json',
        data:{que_id:this.$route.params.que_id},
        success:(data) => {
          this.queData = data.data
        },
        error:(err) => {
          console.log(err) 
        }
      })
    },
    getAns(){
      $.ajax({
        url:'/api/getQueAns',
        type:'get',
        dataType:'json',
        data:{que_id:this.$route.params.que_id},
        success:(data) => {
          this.ansData = data.data;
        },
        error:(err) => {
          console.log(err)
        }
      });
    }
  },
  watch:{
    global:function(){
      console.log('setStatus'+this.$store.state.setStatus)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .que-card{
    margin-bottom:1rem 
  }
.ans-list{
  margin-bottom: .5rem
}
</style>
