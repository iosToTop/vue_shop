// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import myHttpServer from '@/plugins/http'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import '@/assets/css/iconfont.css'
import moment from 'moment'

// fundebug bug测试工具
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'
fundebug.apikey = 'a4ca737fba41d230d1869482c6ccd8860c5598fcc8b274d59efc69bfc46f0ab8'
fundebugVue(fundebug, Vue)

Vue.productionTip = false

// 使用Vue插件
Vue.use(elementUI)
Vue.use(myHttpServer)

Vue.config.productionTip = false

// 全局过滤器
Vue.filter('formatDate', (v) => {
  return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
