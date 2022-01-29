import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 引入全局布局组件
import BlogLayout from '@/layout/blog/index.vue'

const routes: Array<RouteRecordRaw> = [
  // 默认为欢迎页
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/blog/welcome/index.vue'),
    meta: {
      title: 'Welcome'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/admin/login/index.vue')
  },
  // blog页面及其子页面
  {
    path: '/blog',
    // 使用Blog的布局
    component: BlogLayout,
    redirect: '/blog/home',
    // children子路由需要在父路由中占位才能显示
    // 即 <router-view/>
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/blog/home/index.vue'),
        meta: {
          title: 'Home'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/blog/category/index.vue'),
        meta: {
          title: 'Category'
        }
      },
      {
        path: 'archives',
        name: 'Archives',
        component: () => import('@/views/blog/archives/index.vue'),
        meta: {
          title: 'Archives'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/blog/about/index.vue'),
        meta: {
          title: 'About'
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
