<template>
  <div class="wrapper body-top">
    <nav-header title="首页" :is-search="true"></nav-header>
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
    <div class="que-list" v-for="itme in queDatasNew" v-if="queIndex===1">
    	<que-list :item="itme" :isbot="1"></que-list>
    </div>
    <div class="que-list" v-for="itme in queDatasLast" v-if="queIndex===2">
      <que-list :item="itme" :isbot="1"></que-list>
    </div>
	<!-- <div class="bom"></div> -->
    <!-- <h1>123</h1> -->
    <!-- hello -->
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import RollCard from '../../components/RollCard'
import QueList from '../../components/QueList'
export default {
  name: 'home',
  components: {
    NavHeader,RollCard,QueList
  },
  data () {
    return {
      queIndex:1,
      queDatasNew:[
      ],
      queDatasLast:[
      ],
      roll_datas:[
        
      ]
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
    if(this.queIndex===1){
      this.getDatasNew();
    }
  },
  methods:{
    changeQue(id){
      this.queIndex=id;
      
    },
    getDatasNew(){
      $.ajax({
        url:'/api/getClassics',
        type:'get',
        dataType:'json',
        cache:'true',
        crossDomain:'true',
        data:{
          page:1,
          userId:window.localStorage.userId
        },
        success:(data) => {
          this.queDatasNew = data.data;
          console.log(data.data)
        },
        error:(error) => {
          console.error(error.toString());
        }
      })
    },
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
    }
  },
  watch:{
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
</style>
