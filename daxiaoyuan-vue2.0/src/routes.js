/**
* 路由配置
*/
// export default [
//   {path: '/', component: require('./pages/Login.vue')},
//   {path: '/home', component: require('./pages/Home.vue')},
//   {path: '/person', component: require('./pages/Person.vue')},
//   {path: '/consult', component: require('./pages/Consult.vue')},
//   {path: '/setmsg', component: require('./pages/UserSet.vue')},
//   {path: '/quecon', component: require('./pages/QueCon.vue')},
//   {path: '/register', component: require('./pages/Register.vue')},
//   {path: '/person/fans_list', component: require('./pages/FansList.vue')},
//   {path: '/person/follows', component: require('./pages/Follow.vue')},
//   {path: '/consult/darenmsg:userId',component: require('./pages/DarenMsg.vue')},
//   {path: '/test', component: require('./test.vue')},
// ]
var routers = [
  {path: '/login', component: require('./pages/Login.vue')},
  {path: '/home', component: require('./pages/Home.vue')},
  {path: '/person', component: require('./pages/Person.vue')},
  {path: '/consult:id',name:'consult', component: require('./pages/Consult.vue')},
  {path: '/setmsg', component: require('./pages/UserSet.vue')},
  {path: '/quecon', component: require('./pages/QueCon.vue')},
  {path: '/register', component: require('./pages/Register.vue')},
  {path: '/person/fans_list', component: require('./pages/FansList.vue')},
  {path: '/person/follows', component: require('./pages/Follow.vue')},
  {path: '/consult/darenmsg:userId',name:'darenmsg',component: require('./pages/DarenMsg.vue')},
  {path: '/test', component: require('./test.vue')},
  {path: '/column', component: require('./pages/Column.vue')},
  {path: "*", redirect: '/login' },
]
export default routers