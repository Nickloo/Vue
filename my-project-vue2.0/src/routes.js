/**
* 路由配置
*/

var routes = {
  // '/': {
  //   component: require('pages/home/Home.vue')
  // },
  // '/home': {
  //   component: require('./pages/Home.vue')
  // },
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/home',
      // name:'home',
      component: require('./pages/Home.vue')
    },
  ]
  
}

export default routes