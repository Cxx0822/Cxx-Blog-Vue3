import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 引入博客全局布局组件
import BlogLayout from '@/layout/blog/index.vue'
// 引入系统管理布局组件
import AdminLayout from '@/layout/admin/index.vue'

// path和name尽量不要重名，即使在不同的模块中
const constantRoutes: Array<RouteRecordRaw> = [
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
        path: ':blogId',
        name: 'Blog',
        component: () => import('@/views/blog/blog/index.vue'),
        meta: {
          title: 'Blog'
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
        path: '/blog/category/:name',
        name: 'CategoryName',
        component: () => import('@/views/blog/category/categoryName.vue'),
        meta: {
          title: 'CategoryName'
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
  },
  // 系统管理页面及其子页面
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/blog-manager/write-blog',
    children: [
      {
        path: 'blog-manager',
        name: 'BlogManager',
        // 需要一个index.vue 存放路由展示 即<router-view />
        component: () => import('@/views/admin/blog-manager/index.vue'),
        redirect: '/admin/blog-manager/write-blog',
        children: [
          {
            path: 'write-blog',
            name: 'WriteBlog',
            component: () => import('@/views/admin/blog-manager/write-blog.vue'),
            meta: {
              // 需要权限 下同
              requireAuth: true,
              title: '新建博客'
            }
          },
          {
            path: 'blog-list',
            name: 'BlogList',
            component: () => import('@/views/admin/blog-manager/blog-list.vue'),
            meta: {
              requireAuth: true,
              title: '文章管理'
            }
          },
          {
            path: 'category-manager',
            name: 'CategoryManager',
            component: () => import('@/views/admin/blog-manager/category-manager.vue'),
            meta: {
              requireAuth: true,
              title: '分类管理'
            }
          },
          {
            path: 'comment',
            name: 'Comment',
            component: () => import('@/views/admin/blog-manager/comment.vue'),
            meta: {
              requireAuth: true,
              title: '评论管理'
            }
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export function resetRouter():void {
  // 刷新页面 vue-router4暂时没有重置路由的方法
  location.reload()
}

export default router
