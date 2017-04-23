<template>
  <div class="wrapper body-top">
    <nav-header title="首页"></nav-header>
    <roll-card :data="roll_datas"></roll-card>
    <div class="sel-btn-box main width-50 wrapper">
      <div class="left-sel float-left width-50 text-center" 
      :class="{ztc:queIndex===1}" @click="changeQue(1)">
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
import NavHeader from '../components/NavHeader'
import RollCard from '../components/RollCard'
import QueList from '../components/QueList'
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
        {
          imgurl:"http://pic.58pic.com/58pic/13/72/07/55Z58PICKka_1024.jpg",
          contitle:"first"
        },
        {
          imgurl:"http://desk.fd.zol-img.com.cn/t_s960x600c5/g1/M00/03/0A/Cg-4jVSORImITDtsAAnpDtmU-6UAAO8BwAjAW8ACekm079.jpg",
          contitle:"second"
        },
        {
          imgurl:"http://desk.fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/0E/ChMkJlbKwaOIN8zJAAs5DadIS-IAALGbQPo5ngACzkl365.jpg",
          contitle:"first"
        },
      ]
    }
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
        },
        error:(error) => {
          console.error(error.toString());
        }
      })
    }
  },
  watch:{
    queIndex:function(){
      // if(this.queIndex==1){
        this.getDatasNew();
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sel-btn-box{
  height: 2.0rem;
  line-height: 2.0rem;
  margin:0 auto;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
}
</style>
