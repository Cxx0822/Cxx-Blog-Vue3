import router from '@/router/index'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { ElMessage } from 'element-plus'
import { RouteRecordRaw } from 'vue-router'

// 引入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

const whiteList = ['/', '/login',
  '/blog/home', '/blog/:blogId', '/blog/category', '/blog/category/:name', '/blog/archives', '/blog/about']

// 路由守卫 路由判断登录 根据路由配置文件的参数
router.beforeEach(async(to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title as string)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 获取当前用户的角色信息

          const { roles } = await userStore.getUserInfo() as any

          // 根据用户的角色信息生成动态信息表
          // generate accessible routes map based on roles
          const accessRoutes:RouteRecordRaw[] = await permissionStore.generateRoutes(roles)

          // dynamically add accessible routes
          // 挂载到动态路由
          for (const accessRoute of accessRoutes) {
            router.addRoute(accessRoute)
          }

          // 404 page must be placed at the end !!!
          // 否则会经常显示404
          // router.addRoute({ path: '*', redirect: '/404', hidden: true } as any)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')
          ElMessage.error((error as string) || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          // NProgress.done()
          next()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
