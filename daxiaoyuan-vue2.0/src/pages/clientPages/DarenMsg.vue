<template>
  <div class="top-bar">
    <nav-header title="答人详情" :back="true"></nav-header>
		<div id="introduct" class="daren-box main">
			<user-logo :user-name="daren_name" :user-logo="user_logo"></user-logo>
			<p class="introduct top-10">
				{{introduction}}
			</p>
		</div>
		<ask-card v-if="userId != darenId" :is-daren="true" :darenId="darenId"></ask-card>
		<div class="drmsg-tag padding-20">他被确认的回答</div>
		<div class="daren-que main" v-for="item in ans_data">
			<que-list :isbot="false" :item="item" ></que-list>
		</div>
		<div class="bom"></div>
		<div class="fallows text-center ztc" @click="fallow">{{fal_btn}}</div>
  </div>
</template>
<script>
import NavHeader from '../../components/NavHeader'
import QueList from '../../components/QueList'
import UserLogo from '../../components/UserLogo'
import AskCard from '../../components/AskCard'
export default {
  name: 'darenmsg',
  components:{
  	NavHeader,QueList,UserLogo,AskCard
  },
  data () {
    return {
		fal_btn:'关注',
    	msg: 'Welcome to Your Vue.js App',
		daren_name:'',
		introduction:'',
		user_logo:'',
    	datas:[],
		ans_data:[],
		darenId:'',
		userId:''
    }
  },
  created(){
	  this.darenId = this.$route.params.userId
  	  console.log('************',this.$route.params.userId,'#####',this.$route.params.userId);
		$.ajax({
			url: '/api/getDarenMsg/person',
			type:'get',
			dataType: 'json',
			cache: true,
			data:{
			daren_id: this.$route.params.userId,
			user_id:window.localStorage.userId
			},
			success: function(data) {
				this.datas = data.data;
				this.daren_name = data.data.daren_msg.username;
				this.introduction = data.data.daren_msg.introduction;
				this.user_logo = data.data.daren_msg.user_logo;
				this.ans_data = data.data.question;
				if(data.data.is_fav === 1){
					this.fal_btn = '已关注'
				}
				console.log("答人信息",this.datas)
				// console.log(this.introduction)
				// let introduct = document.getElementById('introduct');
				// introduct.innerHTML = "<p>"+this.introduction+"</p>";
			}.bind(this),
			error: function(xhr, status, err) {
			}.bind(this)
        });
  },
	mounted(){
    this.userId = window.localStorage.userId;
		// this.getAnslist();
	},
	methods:{
		fallow(){
			// alert('***********')
			if(this.fal_btn === '已关注'){
				if(confirm('确认取消关注？') === true){
					$.ajax({
						url: '/api/delFav',
						type:'post',
						dataType: 'json',
						cache: true,
						data:{
							token:window.localStorage.token,
							userId: window.localStorage.userId,
							fav_id:	this.$route.params.userId,
							fav_name:this.daren_name
						},
						success: function(data) {
							if(data.status === 'OK'){
								alert('取消关注成功')
								this.fal_btn = '关注'
							}
							console.log(this.datas)
						}.bind(this),
						error: function(xhr, status, err) {
						}.bind(this)
					});
				}

			}else{
				if(confirm('确认关注该答人？')){
					$.ajax({
						url: '/api/follows',
						type:'post',
						dataType: 'json',
						cache: true,
						data:{
							userId: window.localStorage.userId,
							fav_id:	this.$route.params.userId
						},
						success: function(data) {
							if(data.status === 'OK'){
								alert('关注成功')
								this.fal_btn = '已关注'
							}
							console.log(this.datas)
						}.bind(this),
						error: function(xhr, status, err) {
						}.bind(this)
					});
				}
			}
		},
		getAnslist(){
			$.ajax({
				url:'/api/getClassics/person',
				type:'get',
				dataType:'json',
				data:{
					answer_user_id:this.$route.params.userId,
					userId:window.localStorage.userId
				},
				success:(data) => {
					this.ans_data = data.data;
					console.log(this.ans_data)
				},
				error:(err) => {
					console.error(err.toString())
				}
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.daren-box{
	/*width: 100%;*/
	padding:0.5rem 1.0rem;
}
.drmsg-tag{
	margin-top:1rem;
	margin-bottom:1rem;
	font-size: 0.75rem
}
.fallows{
	position: fixed;
	width: 100%;
	height: 2rem;
	line-height: 2rem;
	bottom:0rem;
	color: #fff
}
</style>
