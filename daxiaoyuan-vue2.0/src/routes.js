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
var routes = [
  {path: '/login', component: require('./pages/Login.vue')},//登陆页面
  {path: '/home', component: require('./pages/Home.vue')},//主页面
  {path: '/person', component: require('./pages/Person.vue')},//用户页面
  {path: '/consult:id',name:'consult', component: require('./pages/Consult.vue')},//咨询页面
  {path: '/setmsg', component: require('./pages/UserSet.vue')},//用户资料设置页面
  {path: '/quecon', component: require('./pages/QueCon.vue')},//问题详情页面
  {path: '/register', component: require('./pages/Register.vue')},//注册页面
  {path: '/person/fans_list', component: require('./pages/FansList.vue')},//粉丝页面
  {path: '/person/follows', component: require('./pages/Follow.vue')},//关注页面
  {path: '/consult/darenmsg:userId',name:'darenmsg',component: require('./pages/DarenMsg.vue')},//答人信息页面
  {path: '/test', component: require('./test.vue')},//测试
  {path: '/column', component: require('./pages/Column.vue')},//板块页面
  {path: '/wenda:id',name:'wenda', component: require('./pages/WendaCon.vue')},//问答详情页面
  {path: "*", redirect: '/login' },
]
export default routes