import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 引入全局布局组件
import Layout from '@/layout/index.vue'

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
        component: () => import('@/views/Blog.vue'),
        meta: {
          title: 'Home'
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/Category.vue'),
        meta: {
          title: 'Category'
        }
      },
      {
        path: 'archives',
        name: 'Archives',
        component: () => import('@/views/Archives.vue'),
        meta: {
          title: 'Archives'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
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
