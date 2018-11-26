import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 判断是否是登录页面
  if (to.name.toLowerCase() !== 'login') {
    const token = sessionStorage.getItem('token')
    if (!token) {
      Message.warning('您尚未登陆，请登录后访问')
      router.push({ name: 'login' })
      return
    }
  }
  next()
})
export default router
