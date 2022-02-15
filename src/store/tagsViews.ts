import { defineStore } from 'pinia'
import { RouteRecordRaw, RouteRecordName } from 'vue-router'

// 标签栏导航
export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: () => ({
    // 定义数据类型
    // 用户访问过的页面
    visitedViews: [] as RouteRecordRaw[],
    // 实际keep-alive的路由
    cachedViews: [] as RouteRecordName[]
  }),
  actions: {
    // 增加导航路由
    addView(view: RouteRecordRaw) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    // 需要设置view的类型为any 否则ts编译器会不通过 (路由的meta属性是自定义的)
    addVisitedView(view:any) {
      if (this.visitedViews.some(v => v.path === view.path)) return

      this.visitedViews.push(
        Object.assign({}, view, { title: view.meta.title || 'no-name' })
      )
    },
    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },
    // 删除导航路由
    delView(view: RouteRecordRaw) {
      return new Promise(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view: RouteRecordRaw) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }

        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: RouteRecordRaw) {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(view.name as RouteRecordName)
        index > -1 && this.cachedViews.splice(index, 1)

        resolve([...this.cachedViews])
      })
    },

    delOthersViews(view: RouteRecordRaw) {
      return new Promise(resolve => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view: RouteRecordRaw) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter((v:any) => {
          return v.meta.affix || v.path === view.path
        })

        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: RouteRecordRaw) {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(view.name as RouteRecordName)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }

        resolve([...this.cachedViews])
      })
    },
    // 删除所有
    delAllViews() {
      return new Promise(resolve => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise(resolve => {
        const affixTags = this.visitedViews.filter((tag:any) => tag.meta.affix)
        this.visitedViews = affixTags

        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise(resolve => {
        this.cachedViews = []

        resolve([...this.cachedViews])
      })
    },
    // 更新导航视图
    updateVisitedView(view: RouteRecordRaw) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }

})
