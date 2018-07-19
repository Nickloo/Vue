import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Child1 from './views/ChildView1.vue'
import Child2 from './views/ChildView2.vue'
import Child3 from './views/ChildView3.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/child1',
      name: 'Child1',
      component: Child1
    },
    {
      path: '/child2',
      name: 'Child2',
      component: Child2
    },
    {
      path: '/child3',
      name: 'Child3',
      component: Child3
    }
  ]
})
