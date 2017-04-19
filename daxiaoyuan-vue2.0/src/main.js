// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes.js'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
// import * as io from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import store from './store.js'
// Vue.use(VueSocketio, store);
Vue.use(VueSocketio, 'http://localhost:8088'); 
Vue.use(ElementUI);
// import Element from 'element-ui'
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
// const NotFound = { template: '<p>Page not found</p>' }
// const Home = require('./pages/Home.vue')
// const About = { template: '<p>about page</p>' }
// const routes = {
//   '/home': Home,
//   '/about': About
// }

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex)
// filter
Vue.filter('str2arr', function (val) {
	if(val)
		return val.split(/[' ',;；]/)
})
//去掉img标签
// Vue.filter('passImg', function (val) {
// 	if(val)
// 		var reTag = /<img(?:.|\s)*?>/g;
// 		console.log(val.replace(reTag,''))
// 		return val.replace(reTag,'');
// })


// 去掉所有html标签
Vue.filter('passAll', (v)=>v&&v.replace(/<[^>]+>/g,""))

// equal to above
Vue.filter('str2arrLambal', (v)=>v&&v.split(';'))

const router = new VueRouter({
	mode:'history',
	routes:routes
})

// router.beforeEach(function () {
//   window.scrollTo(0, 0)
// })
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  el:'#app',
  router,
  store,
  sockets:{
    connect: function(){
      console.log('socket connected');
    },
    customEmit: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  render: h => h(App)
})
// var router = new Router()

// router.map(routes)

// router.beforeEach(function () {
//   window.scrollTo(0, 0)
// })
// router.start(App, '#app')
// new Vue({
//   el: '#body',
//   // router:router,
//   template: '<App/>',
//   components: { App }
  
// })