import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 引入全局布局组件
import Layout from '@/layout/blog/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    // children子路由需要在父路由中占位才能显示
    // 即 <router-view/>
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/blog/Blog.vue'),
        meta: {
          title: 'Home'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/blog/Category.vue'),
        meta: {
          title: 'Category'
        }
      },
      {
        path: 'archives',
        name: 'Archives',
        component: () => import('@/views/blog/Archives.vue'),
        meta: {
          title: 'Archives'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/blog/About.vue'),
        meta: {
          title: 'About'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/admin/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
