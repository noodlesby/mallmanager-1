import axios from 'axios'
import { Message } from 'element-ui'

const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url.toLowerCase() !== 'login') {
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    const { meta: { status, msg } } = response.data
    if (!(status === 200 || status === 201)) {
      Message.error(msg)
    }
    return response
  }, function (error) {
    // Do something with response error
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default MyPlugin
