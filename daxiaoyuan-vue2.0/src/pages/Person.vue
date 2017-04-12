<template>
  <div class="body wrapper body-top">
  	<nav-header title="个人"></nav-header>
    <div class="top-card text-center">
    	<div class="per-logo" @click="goMsg">
    		<img class="fullsrc" :src="per_logo" alt="">
    	</div>
    	<div class="per-name">{{user_name}}</div>
    	<div class="card-bom">
    		<div class="sel-box">
          <router-link to="/person/fans_list">
    			  <div>{{fans_num}}</div>
            <div style="margin-top:1rem">粉丝</div>
          </router-link>    			
    		</div>
    		<div class="sel-box">
          <router-link to="/person/follows">
    			<div>{{fav_num}}</div>
    			<div style="margin-top:1rem">关注</div>
          </router-link>
    		</div>
    		<div class="sel-box">
    			<div>{{listened_num}}</div>
    			<div style="margin-top:1rem">听过</div>
    		</div>
    		<div class="sel-box">
    			<div>{{ans_num}}</div>
    			<div style="margin-top:1rem">回答</div>
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
    <!--<div class="ask-me" v-if="identy===0 && index === 0">-->
      <!--<button>申请成为答人</button>-->
    <!--</div>-->
    <div class="ask-me" v-for="ask_data in ask_datas" v-if="index === 0 && identy ===0">
      <ask-me v-if="index == 0" :data="ask_data"></ask-me>
    </div>
    <div class="apply fullsrc" v-if="index === 0 && identy ===1">
      <div class="tishi main text-center">
        你还没有被采纳五个回答，还不能成为答人
      </div>
      <button class="apply-button ztc" @click="test">
        申请成为答人
      </button>
    </div> 
    <ask-card v-if="index === 1" ></ask-card>
    <!--<ask-me v-if="index === 1" >{ path:'quecon/my_quecon', query: { que_id: item.que_id }}</ask-me>-->
    <que-list></que-list>
    
      <div class="my-que main wrapper" v-if="index === 1" v-for = "item in my_queData">
        <router-link :to="{name:'my_quecon',params:{que_id:item.que_id}}">
            <h3>{{item.title}}</h3>
            <time class="float-right">{{item.que_date}}</time>
        </router-link>
        
      </div>
    <h2 class="text-center main" v-if="index === 1 && my_queData.length === 0">你还没有进行过提问...</h2>
    <!-- <div class="bom"></div> -->
    <!--<input type="hidden" v-model = '' value="">-->
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
      user_name: '',
      identy:1,
      per_logo:"http://www.zhiyinmusic.cn/cimg/bd17324430.jpg",
      fans_num:2,
      fav_num:3,
      listened_num:8,
      ans_num:2,
      index:0,
      ask_datas:[
      ],
      my_queData:[
        
      ]
     

    }
  },
  created(){
    let user = JSON.parse(localStorage.user)
    console.log(global.user)
    this.user_name = user.username;
    this.identy = user.identy;
    this.fav_num = user.fav_num;
    this.fans_num = user.fans_num;
    this.listened_num = user.listened_num;
    this.ans_num = user.answer_num;
  },
  mounted(){
    this.my_queData = JSON.parse(window.localStorage.my_queData)
  },
  methods:{
  	changPage(id){
  		this.index=id
      if(this.index === 1 && global.getMyque === 0){
        this.getMyQue()
      }
  	},
    goMsg(){
      this.$router.push('/setmsg')
    },
    test(){
      console.log('申请')
    },
    getMyQue:function(){
      $.ajax({
						url: '/api/getQuestion/queCon',
						type:'get', 
						dataType: 'json',
						cache: true,
						data:{
							user_id: JSON.parse(window.localStorage.user).userId,
						},
						success: function(data) {
							if(data.status === 'OK'){
								// this.my_queData = data.data;
                window.localStorage.my_queData = JSON.stringify(data.data);
                this.my_queData = JSON.parse(window.localStorage.my_queData);
                global.getMyque = 1
							}
              
						}.bind(this),
						error: function(xhr, status, err) {
						}.bind(this)
					});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.apply{
  width: 100%;
}
.apply-button{
  /*width: 60%;*/
  float:right;
  padding:.3rem .8rem;
  margin:0 auto;
  border-radius: 0.3rem;
  font-weight: 600;
  color:#fff;
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
