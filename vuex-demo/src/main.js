import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from "axios";
// import mockdata from "./mock"
require("./mock")
Vue.config.productionTip = false
// Vue.use(mockdata)
Vue.prototype.$axios = axios
new Vue({
  created(){
    this.$axios({
      method: 'post',
      url: '/api/user',
      params: {
        
      }
    }).then((res) => {
      console.log(res)
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
