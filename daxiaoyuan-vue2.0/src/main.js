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
import VueSocketio from 'vue-socket.io'
import store from './store.js'
// Vue.use(VueSocketio, store);
Vue.use(VueSocketio, 'http://localhost:8088'); 
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
var router = new VueRouter({
	mode:'history',
	routes:routes
})
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  el:  '#app',
  router,
  store,
  // sockets:{
  //   connect: function(){
  //     console.log('socket connected');
  //   },
  //   customEmit: function(val){
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   }
  // },
  template: '<App/>',
  components: { App }
})