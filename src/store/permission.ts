import { getRoutes } from '@/api/user'
import { constantRoutes, componentMap } from '@/router'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles:Array<string>, route: any) {
  // 判断meta和meta里面的roles是否有值
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes:Array<RouteRecordRaw>, roles:Array<string>):Array<RouteRecordRaw> {
  const res = [] as RouteRecordRaw[]

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({
    routes: [] as RouteRecordRaw[],
    addRoutes: [] as RouteRecordRaw[]
  }),

  actions: {
    // 根据用户生成动态路由
    // 修改为异步函数
    async generateRoutes(roles:Array<string>) {
      let accessedRoutes = [] as RouteRecordRaw[]
      let dbAsyncRoutes = [] as RouteRecordRaw[]
      // 1.从后端数据库中获取所有的路由信息
      // estun-wam账户 默认dbAsyncRoutes为空
      if (roles.includes('estun-wam')) {
        dbAsyncRoutes = []
      } else {
        const res = await getRoutes()
        dbAsyncRoutes = res.data.data
      }

      // 2.过滤路由
      const myAsyncRoutes = dbAsyncRoutes.filter(curr => {
        if (curr.children == null || curr.children.length === 0) {
          delete curr.children
        }
        return replaceComponent(curr)
      })

      // 3.根据角色动态生成路由
      // 判断当前的角色列表中，是否有包含admin
      // 传入的roles信息为role_name

      if (roles.includes('admin')) {
      // 所有路由都可以被访问，将ansyncRoutes改成从数据库中获取
        accessedRoutes = myAsyncRoutes || []
      } else {
      // 根据角色，过滤掉不能访问的路由表
        accessedRoutes = filterAsyncRoutes(myAsyncRoutes, roles)
      }

      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      return accessedRoutes
    }
  }
})

// 替换route对象中的component
function replaceComponent(comp:RouteRecordRaw) {
  if (comp.component && typeof (comp.component) === 'string') {
    comp.component = componentMap[comp.component]
  }

  if (comp.children && comp.children.length > 0) {
    for (let i = 0; i < comp.children.length; i++) {
      comp.children[i] = replaceComponent(comp.children[i])
    }
  }
  return comp
}
