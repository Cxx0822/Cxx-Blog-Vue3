import router from '@/router/index'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// import { useUserStore } from '@/store/user'

// 引入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

const whiteList = ['/', '/login',
  '/blog/home', '/blog/:blogId', '/blog/category', '/blog/category/:name', '/blog/archives', '/blog/about']

// 路由守卫 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
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
      // const userStore = useUserStore()
      // const hasRoles = userStore.roles && userStore.roles.length > 0
      // TODO:角色权限控制
      next()
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
