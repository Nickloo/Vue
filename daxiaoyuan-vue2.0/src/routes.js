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
  {path: '/login', component: require('./pages/clientPages/Login.vue')},//登陆页面
  {path: '/revpsd',name:'revpsd', component: require('./pages/clientPages/RevisePwd.vue')},//修改密码
  {path: '/home',name:'home', component: require('./pages/clientPages/Home.vue')},//主页面
  {path: '/search',name:'search', component: require('./pages/clientPages/Search.vue')},//搜索
  {path: '/person',name:'person', component: require('./pages/clientPages/Person.vue')},//用户页面
  {path: '/consult/:type',name:'consult', component: require('./pages/clientPages/Consult.vue')},//咨询页面
  {path: '/setmsg/:userId',name:'setmsg', component: require('./pages/clientPages/UserSet.vue')},//用户资料设置页面
  {path: '/quecon/:que_id',name:'quecon', component: require('./pages/clientPages/QueCon.vue')},//问题详情页面
  {path: '/my_quecon/:que_id',name:'my_quecon', component: require('./pages/clientPages/MyQuecon.vue')},//我的问题详情页面
  {path: '/register', component: require('./pages/clientPages/Register.vue')},//注册页面
  {path: '/fans_list', component: require('./pages/clientPages/FansList.vue')},//粉丝列表页面
  {path: '/fans_msg/:user_id',name:'fans_msg', component: require('./pages/clientPages/FansMsg.vue')},//粉丝信息页面
  {path: '/follows', component: require('./pages/clientPages/Follow.vue')},//关注页面
  {path: '/my_answer',name:'my_answer', component: require('./pages/clientPages/MyAnswer.vue')},//我的回答
  {path: '/consult/darenmsg/:userId',name:'darenmsg',component: require('./pages/clientPages/DarenMsg.vue')},//答人信息页面
  {path: '/test', component: require('./test.vue')},//测试
  {path: '/column', component: require('./pages/clientPages/Column.vue')},//板块页面
  {path: '/404', component: require('./pages/404.vue')},//板块页面
  {path: '/wenda/:id',name:'wenda', component: require('./pages/clientPages/WendaCon.vue')},//问答详情页面
  {path: '/apply',name:'apply', component: require('./pages/clientPages/ApplyDr.vue')},//申请成为答人
  {path: '/message',name:'message', component: require('./pages/clientPages/Message.vue')},//消息页面
  {path: '/ask',name:'ask', component: require('./pages/clientPages/AskPage.vue')},//消息页面
  {path: '/adlogin', component: require('./pages/adminPages/AdLogin.vue')},//管理员登陆
  {
    path:'/admin',
    component: function(resolve) {
      require([
        './pages/adminPages/Admin.vue'
      ], resolve)
    },
    children:[
        {
            path:'/admin/users',
            component:require('./pages/adminPages/Users.vue')
        },
        {
            path:'/admin/userapply',
            component:require('./pages/adminPages/UserApply.vue')
        },
        {
            path:'/admin/allque',
            component:require('./pages/adminPages/AllQue.vue')
        },
        {
            path:'/admin/function',
            component:require('./pages/adminPages/Function.vue')
        }
    ]
  },
  {path: "/", redirect: '/login' },
  {path: "*", redirect: '/404' },

]
export default routes
