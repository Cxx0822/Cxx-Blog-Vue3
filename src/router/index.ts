import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    redirect: 'Home',
    // children子路由需要在父路由中占位才能显示
    // 即 <router-view/>
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/blog/:bolgId',
        name: 'Blog',
        component: () => import('@/views/Blog.vue'),
        meta: {
          title: '博客'
        }
      },
      {
        path: '/archives',
        name: 'Archives',
        component: () => import('@/views/Archives.vue'),
        meta: {
          title: '归档'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '关于我'
        }
      },
      {
        path: '/friends',
        name: 'Friends',
        component: () => import('@/views/Friends.vue'),
        meta: {
          title: '友链'
        }
      },
      {
        path: '/category/:name',
        name: 'Category',
        component: () => import('@/views/Category.vue'),
        meta: {
          title: '分类'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
