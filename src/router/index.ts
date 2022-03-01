import { createRouter, createWebHashHistory } from 'vue-router'

// 引入博客全局布局组件
import BlogLayout from '@/layout/blog/index.vue'
// 引入系统管理布局组件
import AdminLayout from '@/layout/admin/index.vue'

/**
 * 定义组件名称和组件对象的map对象
*/
export const componentMap = {
  // 和数据库中的component字段绑定
  layout: ():any => import('@/layout/admin/index.vue').then(m => m.default),
  permission_user: ():any => import('@/views/admin/permission/user.vue').then(m => m.default),
  permission_role: ():any => import('@/views/admin/permission/role.vue').then(m => m.default)
}

// path和name尽量不要重名，即使在不同的模块中
export const constantRoutes: Array<any> = [
  // 默认为欢迎页
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/blog/welcome/index.vue'),
    hidden: true,
    meta: {
      title: 'Welcome'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/admin/login/index.vue'),
    hidden: true
  },
  // blog页面及其子页面
  {
    path: '/blog',
    // 使用Blog的布局
    component: BlogLayout,
    redirect: '/blog/home',
    hidden: true,
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
    path: '/blog-manager',
    name: 'BlogManager',
    component: AdminLayout,
    redirect: '/blog-manager/write-blog',
    alwaysShow: true,
    meta: {
      title: '博客管理',
      icon: 'blogManager'
    },
    children: [
      {
        path: 'write-blog',
        name: 'WriteBlog',
        component: () => import('@/views/admin/blog-manager/write-blog.vue'),
        meta: {
          title: '新建博客',
          icon: 'writeBlog'
        }
      },
      {
        path: 'blog-list',
        name: 'BlogList',
        component: () => import('@/views/admin/blog-manager/blog-list.vue'),
        meta: {
          title: '文章管理',
          icon: 'blogList'
        }
      },
      {
        path: '/blog-manager/blog-list/:blogId',
        name: 'EditBlog',
        hidden: true,
        meta: {
          title: '编辑博客',
          icon: 'writeBlog'
        },
        component: () => import('@/views/admin/blog-manager/write-blog.vue')
      },
      {
        path: 'category-manager',
        name: 'CategoryManager',
        component: () => import('@/views/admin/blog-manager/category-manager.vue'),
        meta: {
          title: '分类管理',
          icon: 'categoryManager'
        }
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/admin/blog-manager/comment.vue'),
        meta: {
          title: '评论管理',
          icon: 'commentManage'
        }
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
