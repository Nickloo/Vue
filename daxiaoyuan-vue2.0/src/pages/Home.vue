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
    	<que-list :item="itme"></que-list>
    </div>
    <div class="que-list" v-for="itme in queDatasLast" v-if="queIndex===2">
      <que-list :item="itme"></que-list>
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
      	{
    			user_name:'Tom',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd17324430.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。',
    			que_id:'1',
    			fav_num:'1',
    		  },
  		  {
    			user_name:'Lisa',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd14132626.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
    			que_id:'1',
    			fav_num:'1',
    		},
    		{
    			user_name:'Jay',
    			user_logo:'http://www.zhiyinmusic.cn/cimg/bd118987818.jpg',
    			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
    			que_id:'1',
    			fav_num:'1',
    		}
      ],
      queDatasLast:[
        {
          user_name:'Jay',
          user_logo:'http://www.zhiyinmusic.cn/cimg/bd17324430.jpg',
          que_content:'组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
          que_id:'1',
          fav_num:'8',
          },
        {
          user_name:'Lisa',
          user_logo:'http://www.zhiyinmusic.cn/cimg/bd14132626.jpg',
          que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
          que_id:'1',
          fav_num:'1',
        },
        {
          user_name:'Jay',
          user_logo:'http://www.zhiyinmusic.cn/cimg/bd118987818.jpg',
          que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
          que_id:'1',
          fav_num:'1',
        }
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
  methods:{
    changeQue(id){
      this.queIndex=id;
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
.selected{

}
</style>
