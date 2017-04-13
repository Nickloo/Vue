<template>
  <div class="body">
	  <nav-header :title="title" :back="true"></nav-header>
		<div class="body-top"></div>
	  <nav class="select-box wrapper">
	  	<div class="select-btn text-center" :class="{active:index==1}" @click="changList(1)">答 主</div>
	  	<div class="select-btn text-center" :class="{active:index==2}" @click="changList(2)">问 答</div>
	  </nav>
	  <div class="daren" v-for="data in darenDatas" v-if="index==1">
	  	<daren-list :data="data"></daren-list>
	  </div>
	  <div class="ask-me" v-for="ask_data in ask_datas"  v-if="index==2">
      <ask-me :data="ask_data"></ask-me>
    </div>
	  <div class="bom"></div>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import DarenList from '../components/DarenList'
import AskMe from '../components/AskMe'
export default {
  name: 'consult',
  components:{
  	NavHeader,DarenList,AskMe
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      index:1,
      title:'',
			type:'',
      ask_datas:[
      ],
      darenDatas:[
      ]
    }
  },
  mounted(){
    this.index = window.localStorage.consult_sta;
		// this.title = this.$route.params.title;
    this.type = this.$route.params.type;
		//答人列表
		$.ajax({
        url: '/api/getDarenMsg',
        type:'get', 
        dataType: 'json',
        crossDomain: true,
        cache: true,
        data: {type:this.type},//序列化
        success: function(data) {
          console.log(data);
          if(data.status === 'OK'){
            this.darenDatas = data.data
						console.log('********************')
						console.log(this.darenDatas)
          }else{
            alert(data.msg)
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err)
        }.bind(this)
  	});
		//问题
		$.ajax({
        url: '/api/getQuestion',
        type:'get', 
        dataType: 'json',
        crossDomain: true,
        cache: true,
        // data: $('#loginForm').serialize(),//序列化
        success: function(data) {
          console.log(data);
          if(data.status === 'OK'){
            this.ask_datas = data.data
						console.log('********************')
						console.log(this.ask_datas)
          }else{
            alert(data.msg)
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.log(err)
        }.bind(this)
  	});
  },
  methods:{
  	changList(id){
  		this.index=id;
      window.localStorage.consult_sta=id;
  		// if(this.index==1){
  		// 	this.title='答 人'
	  	// }else{
	  	// 	this.title='问 答'
	  	// }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	height: 0.25rem
}
.select-box{
	height: 2rem;
	line-height: 2rem;
	width: 50%;
	margin:0 auto;
	/*border: 0.05rem solid blue;*/
	border-radius: 0.75rem;
	font-size: 0.9rem;
	margin-bottom: 0.5rem;
	background: #fff
}
.select-btn{
	height: 100%;
	width: 50%;
	float: left;
}
.active{
	color: #fff;
	font-weight: 600;
	background: #2b8ff7;
}
</style>
