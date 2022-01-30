import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  // store
  // 它用于 devtools 并允许恢复状态
  id: 'main',
  // 一个返回新状态的函数
  state: () => ({
    counter: 0,
    name: 'Eduardo'
  }),
  // getters
  getters: {
    doubleCount(state) {
      return state.counter * 2
    }
  },
  // actions
  actions: {
    reset() {
      // `this` 使 store 实例
      this.counter = 0
    }
  }
})
