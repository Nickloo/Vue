<template>
  <div class="top-bar">
    <nav-header title="答人详情" :back="true"></nav-header>
		<div class="daren-box main">
			<user-logo :user-name="daren_name" :user-logo="user_logo"></user-logo>
			<div class="introduct top-10">
				{{introduction}}
			</div>
		</div>
		<div class="drmsg-tag">他被确认的回答</div>
		<div class="daren-que main" v-for="item in datas.answer">
			<que-list :isbot="true" :item="item" :is-over="true" :username="daren_name"></que-list>
		</div>
		<div class="fallows text-center ztc" @click="fallow">{{fal_btn}}</div>
  </div>
</template>
<script>
import NavHeader from '../components/NavHeader'
import QueList from '../components/QueList'
import UserLogo from '../components/UserLogo'
export default {
  name: 'darenmsg',
  components:{
  	NavHeader,QueList,UserLogo
  },
  data () {
    return {
			fal_btn:'关注',
      msg: 'Welcome to Your Vue.js App',
			daren_name:'',
			introduction:'',
			user_logo:'',
      datas:[

    	],
			ans_data:[]
    }
  },
  mounted(){
		
  	console.log('************',this.$route.params.userId);
		$.ajax({
        url: '/api/getDarenMsg/person',
        type:'get', 
        dataType: 'json',
        cache: true,
        data:{
          daren_id: this.$route.params.userId,
					user_id:JSON.parse(window.localStorage.user).userId
        },
        success: function(data) {
					this.datas = data.data;
					this.daren_name = data.data.daren_msg.username;
					this.introduction = data.data.daren_msg.introduction;
					this.user_logo = data.data.daren_msg.user_logo;
					if(data.data.is_fav === 1){
						this.fal_btn = '已关注'
					}
					console.log(this.datas)
        }.bind(this),
        error: function(xhr, status, err) {
        }.bind(this)
    });
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
							userId: JSON.parse(window.localStorage.user).userId,
							fav_id:	this.$route.params.userId,
							fans_name: JSON.parse(window.localStorage.user).username,
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
							userId: JSON.parse(window.localStorage.user).userId,
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
}
</style>
