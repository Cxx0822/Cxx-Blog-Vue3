import router from '@/router/index'
import { getToken } from '@/utils/auth'

// 路由守卫 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 获取token
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
      } else {
        next()
      }
    } else {
      // 没有则转入login页面
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
