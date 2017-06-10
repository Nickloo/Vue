<template>
  <div class="wrapper body-top">
    <nav-header title="首页" :is-search="true" :ask="true" :ask-card="askCard"></nav-header>
    
    <div class="block">
      <el-carousel :interval="2000" height="7.5rem">
        <el-carousel-item v-for="item in roll_datas" class="text-center" :key="item">
          <a :href="item.link">
            <img :src="item.picture" class="fullsrc" >
            <div class="cont-title" style="color:black">{{item.title}}</div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--选择按钮-->
    <div class="sel-btn-box main width-50 wrapper">
      <div class="left-sel float-left width-50 text-center"
      :class="{ztc:queIndex===1}"  @click="changeQue(1)">
        最新动态
      </div>
      <div class="right-sel float-left width-50 text-center"
      :class="{ztc:queIndex===2}" @click="changeQue(2)">
        往日经典
      </div>
    </div>
    <!--最新动态-->
    <div class="que-list" v-for="itme in queDatasNew" v-if="queIndex===1">
    	<que-list :item="itme" :isbot="1"></que-list>
    </div>
    <!--往日经典-->
    <div class="que-list" v-for="itme in queDatasLast" v-if="queIndex===2">
      <que-list :item="itme" :isbot="1"></que-list>
    </div>
    <!--获取更多-->
    <div class="get-more" v-if="queIndex==1" style="margin-top:.5rem">
      <el-button type="primary" :loading="isload" size="mini" class="width-max"  @click="getDatasNew()">
        {{btn_msg}}
      </el-button>
    </div>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import RollCard from '../../components/RollCard'
import QueList from '../../components/QueList'
import AskCard from '../../components/AskCard'
export default {
  name: 'home',
  components: {
    NavHeader,RollCard,QueList,AskCard
  },
  data () {
    return {
      queIndex:1,
      queDatasNew:[
      ],
      queDatasLast:[
      ],
      roll_datas:[
      ],
      btn_msg:'加载更多',
      isload:true,
      page:0,
      isfav:1,
      is_card:false
    }
  },
  beforeCreate(){
    $.ajax({
        url:'/api/getNews',
        type:'get',
        dataType:'json',
        success: data => {
          this.roll_datas = data.data;
          console.log('news is',data.data)
        }
      })
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
        if(data.data.length>0){
          this.isfav=1
        }else{
          this.isfav=0
        }
        this.getDatasNew();
      },
      error:(Error) => {
        console.log(Error.toString())
      }
    })
  },
  methods:{
    //选择浏览类型
    changeQue(id){
      this.queIndex=id;
      
    },
    //请求最新问答
    getDatasNew(){
      this.page++;
      console.log(this.page)
      $.ajax({
        url:'/api/getClassics',
        type:'get',
        dataType:'json',
        cache:'true',
        crossDomain:'true',
        data:{
          page:this.page,
          userId:window.localStorage.userId,
          isfav:this.isfav
        },
        success:(data) => {
          this.queDatasNew = this.queDatasNew.concat(data.data);
          if(data.data.length===0){
            this.btn_msg = '没有更多了';
            console.log('没有更多了');
            this.isload = false;
            console.log(data.data)
          }
          //判断收藏用户问答是否浏览结束
          if(this.isfav&&data.data[0].page===0){
            this.page=0;
            this.isfav=0;
            console.log('isfav0');
          }
          this.isload = false;
          console.log(data.data)
        },
        error:(error) => {
          console.error(error.toString());
        }
      })
    },
    //请求经典回答
    getOldque(){
      $.ajax({
        url:'/api/getOldque',
        type:'get',
        dataType:'json',
        data:{
          page:1,
          userId:window.localStorage.userId
        },
        success: data => {
          this.queDatasLast = data.data;
          console.log(data.data)
        },
        error: err => {
          console.error(err)
        }
      })
    },
    //请求首页推荐
    getNews(){
      $.ajax({
        url:'/api/getNews',
        type:'get',
        dataType:'json',
        success: data => {
          this.roll_datas = data.data;
          console.log('news is',data.data)
        }
      })
    },
    askCard(){
      console.log('提问');
      // this.is_card=true;
      this.$router.push('/ask')
    }
  },
  watch:{
    // 通过监视queIndex是否变化判断请求类型
    queIndex:function(){
      if(this.queIndex==1){
        this.getDatasNew();
      }else{
        this.getOldque();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sel-btn-box{
  height: 1.4rem;
  line-height: 1.4rem;
  margin:0 auto;
  border-radius: 0.2rem;
  margin-top: 0.5rem;
  font-size: 14px;
  color: #2b8ff7;
}
.ztc{
  color: #fff;
}
.el-carousel__item{
    color: #475669;
    font-size: 0.9rem;
    opacity: 0.75;
    line-height: 7.5rem;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.cont-title{
	position: absolute;
	width: 100%;
	z-index: 1000;
	font-size: 1rem;
	top: 0rem;
	font-weight: 700;
	color: #fff;
}
.back-disable{
  position: absolute;
  background: black;
  opacity: 0.5;
  width:100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
