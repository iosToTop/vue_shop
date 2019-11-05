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

Vue.productionTip = false

// 使用Vue插件
Vue.use(elementUI)
Vue.use(myHttpServer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
