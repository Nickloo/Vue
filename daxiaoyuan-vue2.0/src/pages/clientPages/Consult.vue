<template>
  <div class="body">
	  <nav-header :title="title" :back="true"></nav-header>
		<div class="body-top"></div>
	  <nav class="select-box wrapper">
	  	<div class="select-btn text-center" :class="{active:index==1}" @click="changList(1)">答 主</div>
	  	<div class="select-btn text-center" :class="{active:index==2}" @click="changList(2)">问 答</div>
	  </nav>
	  <div  v-for="data in darenDatas" v-if="index==1">
	  	<daren-list :data="data"></daren-list>
	  </div>
	  <div class="ask-me" v-for="ask_data in ask_datas"  v-if="index==2">
      <ask-me :data="ask_data"></ask-me>
    </div>
    <div class="get-more">
      <el-button type="primary" :loading="isload" size="mini" class="que-loading"  @click="getQue()">
        {{btn_msg}}
      </el-button>
    </div>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import DarenList from '../../components/DarenList'
import AskMe from '../../components/AskMe'
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
      ],
      page:1,
      btn_msg:'加载更多',
      isload:true
    }
  },
  mounted(){
    // this.index = window.localStorage.consult_sta;
    this.type = this.$route.params.type;
    if(this.index === 1){
      this.getDarenMsg()
    }else{
      this.ask_datas=[]
      this.getQue();
    }
  },
  methods:{
  	changList(id){
  		this.index=id;
      this.page = 1;
      this.ask_datas=[];
      window.localStorage.consult_sta=id;
      if(this.index === 1){
        this.getDarenMsg()
      }else{
        this.page = 1;
        this.getQue();
      }
  	},
    getDarenMsg(){
      this.isload = true;
      this.btn_msg = "疯狂加载中";
      $.ajax({
        url: '/api/getDarenMsg',
        type:'get',
        dataType: 'json',
        crossDomain: true,
        cache: true,
        data: {type:this.type},
        success: (data) => {
          console.log(data);
          this.darenDatas = data.data
					console.log('********************')
					console.log(this.darenDatas);
          if(data.data.length < 5){
              this.isload = false;
              this.btn_msg = "没有更多了。。。";
          }else{
              this.isload = false;
              this.btn_msg = "加载更多";
          }
          this.page++;
        },
        error:(xhr, status, err) => {
          console.log(err)
        }
  	  });
    },
    getQue(){
      console.log('^^^^^^^^^^^^^^^^'+this.page)
      this.isload = true;
      this.btn_msg = "疯狂加载中"
      $.ajax({
        url: '/api/getQuestion',
        type:'get',
        dataType: 'json',
        crossDomain: true,
        cache: true,
        data:{
          type:this.type,
          page:this.page
        },
        success:(data) => {
          setTimeout(()=>{
            if(data.status === 'OK'){
              this.ask_datas=this.ask_datas.concat(data.data);
              if(data.data.length < 5){
                this.isload = false;
                this.btn_msg = "没有更多了。。。"
              }else{
                this.isload = false;
                this.btn_msg = "加载更多";
              }
              this.page++;
            }else{
              console.log(data.msg)
            }
          },0)

        },
        error:(err) => {
          console.error(err)
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.get-more{
  width:50%;
  /*position: relative;*/
  margin:0 auto;
}
.que-loading{
  width: 100%;
  /*margin:auto 0;*/
  /*margin-left: 50%;*/
}
</style>
