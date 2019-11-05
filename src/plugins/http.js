import axios from 'axios'
import Vue from 'vue'

const myHttpServer = {}

myHttpServer.install = function () {
  // 为axios请求头添加token
  axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  })

  // axios全局挂载Url
  axios.defaults.baseURL = 'http://39.108.193.251:8811/api/private/v1/'

  Vue.prototype.$http = axios
}

export default myHttpServer
