<template>
  <div class="body body-top">
  	<nav-header title="个人"></nav-header>
    <!--消息提示-->
    <router-link to="/message">
      <i class="el-icon-message" :style="{color:isMsg?'red':'#919ba6'}"></i>
    </router-link>
    <div class="top-card text-center">
    	<div class="per-logo" @click="goMsg">
    		<img class="fullsrc" :src="user.user_logo" alt="">
    	</div>
    	<div class="per-name">{{user.username}}</div>
      <!--<div class="text-center">
        {{identy==1?'答人':'普通'}}
      </div>-->
    	<div class="card-bom">
    		<div class="sel-box">
          <router-link to="/fans_list">
    			  <div>{{user.fans_num}}</div>
            <div class="sel-box-text">粉丝</div>
          </router-link>
    		</div>
    		<div class="sel-box">
          <router-link to="/follows">
    			<div>{{user.fav_num}}</div>
    			<div class="sel-box-text">关注</div>
          </router-link>
    		</div>
    		<!--<div class="sel-box">
    			<div>{{user.listened_num}}</div>
    			<div class="sel-box-text">听过</div>
    		</div>-->
    		<div class="sel-box">
          <router-link to="/my_answer">
            <div>{{user.answer_num}}</div>
    			  <div class="sel-box-text">回答</div>
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
    <div class="ask-me" v-for="item in askmeData" v-if="index === 0 && identy === 1">
      <ask-me v-if="index == 0" :data="item"></ask-me>
    </div>
    <div  v-if="index === 0 && identy === 0" >
      <h3 class="text-center">只有答人能接受提问,赶快申请吧</h3>
      <el-button class="apply-button" type="primary" @click="goApply()">
        申请成为答人
      </el-button>
    </div>
    <!--提问模块-->
    <ask-card v-if="index === 1" ></ask-card>
    <div class="my-que main wrapper" v-if="index === 1" v-for = "item in $store.state.my_queData">
        <router-link :to="{name:'my_quecon',params:{que_id:item.que_id}}">
            <h3>{{item.title}}</h3>
            <time class="float-right">{{item.que_date}}</time>
        </router-link>
    </div>
    <!--<h2 class="text-center main" v-if="index === 1 && my_queData.length === 0">你还没有进行过提问...</h2>-->
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import AskCard from '../../components/AskCard'
import AskMe from '../../components/AskMe'
import QueList from '../../components/QueList'
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
      ],
      askmeData:[],
      isMsg:''
    }
  },
  mounted(){
    this.getMymsg();
    this.getMessage();
    if(this.index == 0){
      this.getAskme();
    }else{
      this.getMyQue();
    }
  },
  methods:{
  	changPage(id){
  		this.index=id
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
      });
    },
    getAskme(){
      $.ajax({
        url:'/api/getAskDaren',
        type:'get',
        dataType:'json',
        data:{
          userId:window.localStorage.userId,
          token:window.localStorage.token
        },
        success: data => {
          if(data.status === 'OK'){
            this.askmeData = data.data;
            console.log(data.data)
          }else{
            alert(data.msg);
          }
        },
        error: err => {
          console.error(err);
        }
      });
    },
    getMessage(){
      $.ajax({
        url:'/api/getMessage',
        type:'get',
        dataType:'json',
        crossDomain:true,
        data:{
          userId:window.localStorage.userId
        },
        success:(data) => {
          this.$store.setMessage(data.data);
          if(data.data.length==0){
            this.isMsg = false;
          }else{
            this.isMsg = true;
            this.$notify({
              title: '消息',
              message: '你有'+data.data.length+'条新消息等待查看',
              // type: 'success'
            });
          }
          console.log('message:',this.$store.state.message)
        },
        error:(err) => {
          console.error(err);
        }
      })
    }
  },
  watch:{
    index:function(){
      if(this.index == 0){
        this.getAskme();
      }else{
        this.getMyQue();
      }
    }
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
	background: #fff;
	padding-top:1.25rem;
  padding-bottom:.8rem;
}
.per-logo{
	height:5.0rem;
	width: 5.0rem;
	/*border-radius: 10.0rem;*/
	background: #eee;
	margin:0 auto;
}
.per-name{
	font-size: .9rem;
  font-weight: 500;
	margin-top: 0.5rem;
}
.card-bom{
	padding-top: 0.25rem;
	width:100%;
	margin-top:1rem;
}
.sel-box{
	float: left;
	width: 33.3%;
	text-align:center;
	font-size: 0.9rem;
	/*background: red*/
}
.sel-box-text{
  margin-top:.5rem;
  color: #919ba6;
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
  color: #919ba6;
}
.active{
	border-bottom: 0.1rem solid rgb(43, 143, 248);
  color:rgb(43, 143, 248)
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
