<template>
  <div class="wrapper">
    <nav-header title="首页"></nav-header>
    <roll-card :data="roll_datas"></roll-card>
    <div class="que-list" v-for="itme in queDatas">
    	<que-list :item="itme"></que-list>
    </div>
	<div class="bom"></div>
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
      queDatas:[
      	{
  			user_name:'Tom',
  			user_logo:'http://www.zhiyinmusic.cn/cimg/bd17324430.jpg',
  			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
  			que_id:'1',
  			fav_num:'1',
  		},
  		{
  			user_name:'Lisa',
  			user_logo:'http://imgsrc.baidu.com/forum/w=580/sign=8da0626cbc8f8c54e3d3c5270a2b2dee/f2df44391f30e9249a6838b344086e061f95f7b9.jpg',
  			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
  			que_id:'1',
  			fav_num:'1',
  		},
  		{
  			user_name:'Jay',
  			user_logo:'http://v1.qzone.cc/avatar/201408/13/15/44/53eb1770a14ef514.jpg%21200x200.jpg',
  			que_content:'组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素， Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。',
  			que_id:'1',
  			fav_num:'1',
  		}
      ],
      roll_datas:[
        {
          imgurl:"http://imgsrc.baidu.com/forum/pic/item/968aad8fd8f152b6d439c92e.jpg",
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body{
	height: 0.5rem
}
</style>
