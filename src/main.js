// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'

// 为axios请求头添加token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// axios全局挂载Url
axios.defaults.baseURL = 'http://39.108.193.251:8888/api/private/v1/'

// 为全局Vue添加属性成员
Vue.prototype.$http = axios

Vue.productionTip = false

// 使用Vue插件
Vue.use(elementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})