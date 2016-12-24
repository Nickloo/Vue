// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes.js'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
const NotFound = { template: '<p>Page not found</p>' }
// const Home = require('./pages/Home.vue')
const About = { template: '<p>about page</p>' }
// const routes = {
//   '/home': Home,
//   '/about': About
// }

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter(routes)
// router.beforeEach(function () {
//   window.scrollTo(0, 0)
// })
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#body')
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