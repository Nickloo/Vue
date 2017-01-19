/**
* 路由配置
*/
export default [
  {path: '/login', component: require('./pages/Login.vue')},
  {path: '/home', component: require('./pages/Home.vue')},
  {path: '/person', component: require('./pages/Person.vue')},
  {path: '/consult', component: require('./pages/Consult.vue')},
  {path: '/setmsg', component: require('./pages/UserSet.vue')},
  {path: '/quecon', component: require('./pages/QueCon.vue')},
  {path: '/register', component: require('./pages/Register.vue')},
  {path: '/fans_list', component: require('./pages/FansList.vue')},
]