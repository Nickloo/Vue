<template>
  <div class="body body-top">
  	<nav-header title="个人"></nav-header>
    <i class="el-icon-message"></i>
    <div class="top-card text-center">
    	<div class="per-logo" @click="goMsg">
    		<img class="fullsrc" :src="user.user_logo" alt="">
    	</div>
    	<div class="per-name">{{user.username}}</div>
    	<div class="card-bom">
    		<div class="sel-box">
          <router-link to="/fans_list">
    			  <div>{{user.fans_num}}</div>
            <div style="margin-top:1rem">粉丝</div>
          </router-link>    			
    		</div>
    		<div class="sel-box">
          <router-link to="/follows">
    			<div>{{user.fav_num}}</div>
    			<div style="margin-top:1rem">关注</div>
          </router-link>
    		</div>
    		<div class="sel-box">
    			<div>{{user.listened_num}}</div>
    			<div style="margin-top:1rem">听过</div>
    		</div>
    		<div class="sel-box">
          <router-link to="/my_answer">
            <div>{{user.answer_num}}</div>
    			  <div style="margin-top:1rem">回答</div>
          </router-link>
    		</div>
    	</div>
    </div>
    <div class="bom-card" style="margin-bottom:0.2rem">
    	<div class="sel-page text-center" :class="{ active: index == 0 }" @click="changPage(0)">
    		向我提问
    	</div>
    	<div class="sel-page text-center" :class="{ active: index == 1 }" @click="changPage(1)">
    		我的提问
    	</div>
    </div>
    <!--想我提问模块-->
    <div class="ask-me" v-for="ask_data in ask_datas" v-if="index === 0 && identy === 1">
      <ask-me v-if="index == 0" :data="ask_data"></ask-me>
    </div>
    <div  v-if="index === 0 && identy === 0" >
      <h3 class="text-center">只有答人能接受提问,赶快申请吧</h3>
      <el-button class="apply-button" type="primary" @click="goApply()">
        申请成为答人
      </el-button>
    </div>
    <!--提问模块-->
    <ask-card v-if="index === 1" ></ask-card>
    <div class="my-que main wrapper" v-if="index === 1" v-for = "item in my_queData">
        <router-link :to="{name:'my_quecon',params:{que_id:item.que_id}}">
            <h3>{{item.title}}</h3>
            <time class="float-right">{{item.que_date}}</time>
        </router-link>
    </div>
    <h2 class="text-center main" v-if="index === 1 && my_queData.length === 0">你还没有进行过提问...</h2>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import AskCard from '../components/AskCard'
import AskMe from '../components/AskMe'
import QueList from '../components/QueList'
export default {
  name: 'person',
  components:{
  	NavHeader,AskCard,AskMe,QueList
  },
  data () {
    return {
      user:{},
      identy:1,
      index:0,
      ask_datas:[
      ],
      my_queData:[
        
      ]
    }
  },
  mounted(){
    this.getMymsg();
  },
  methods:{
  	changPage(id){
  		this.index=id
      if(this.index === 1){
        this.getMyQue()
      }
  	},
    goMsg(){
      this.$router.push({name:'setmsg',params:{userId:window.localStorage.userId}})
    },
    goApply(){
      this.$router.push('/apply')
    },
    getMyQue(){
      $.ajax({
						url: '/api/getQuestion/queCon',
						type:'get', 
						dataType: 'json',
						cache: true,
						data:{
							user_id:window.localStorage.userId,
						},
						success: function(data) {
							if(data.status === 'OK'){
                this.my_queData = data.data;
                this.$store.setMyque(data.data)
                global.getMyque = 1
							}
						}.bind(this),
						error: function(xhr, status, err) {
						}.bind(this)
					});
    },
    getMymsg(){
      $.ajax({
        url:'/api/getUser',
        type:'get',
        dataType:'json',
        data:{
          userId:window.localStorage.userId,
          token:window.localStorage.token
        },
        success:(data) => {
          if(data.status === "OK"){
            this.user = data.data;
            this.identy = this.user.identy;
            global.user = this.user;
          }else{
            this.$router.push('/login')
          }
          
        },
        error:(err) => {
          console.error(err)
        }
      })
    }
  },
  watch:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-icon-message{
  position: absolute;
  z-index: 100;
  right: 1rem;
  top:1rem;
}
.top-card{
	overflow: hidden;
	/*// height: 13rem;*/
	background: #fff;
	padding-top:1.25rem;
  padding-bottom:1.25rem;
}
.per-logo{
	height:5.0rem;
	width: 5.0rem;
	/*border-radius: 10.0rem;*/
	background: #eee;
	margin:0 auto;
}
.per-name{
	font-size: 1rem;
	margin-top: 0.5rem
}
.card-bom{
	padding-top: 0.25rem;
	width:100%;
	/*background: blue;*/
	height: 3.5rem;
	margin-top:2.5rem;
}
.sel-box{
	float: left;
	height: 100%;
	width: 25%;
	text-align:center;
	font-size: 0.9rem;
	/*background: red*/
}
.bom-card{
	/*overflow: hidden;*/
	width:100%;
	margin-top: 1.25rem;
	height: 2.5rem;
	line-height: 2.5rem;
	background: #fff;
	font-size: 0.9rem
}
.sel-page{
	float:left;
	height: 100%;
	width:50%;	
}
.active{
	border-bottom: 0.1rem solid blue
}
.apply-button{
  display: block;
  margin:2rem auto;
  border-radius: 0.3rem;
}
.tishi{
  margin-top:2rem;
  height: 5rem;
  line-height: 5rem;
}
.my-que{
  margin-top: .15rem;
  padding: .1rem .5rem ;
}
/*.my-que time{
  
}*/
</style>
