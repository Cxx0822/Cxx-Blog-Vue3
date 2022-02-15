import { defineStore } from 'pinia'

import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { useTagsViewStore } from './tagsViews'

interface userInfo {
  username: string,
  password: string,
  salt?: string,
  nickname?: string,
  avatar?: string,
  email?: string,
  status?: boolean
}

export const useUserStore = defineStore({
  // store
  // 它用于 devtools 并允许恢复状态
  id: 'user',
  // 一个返回新状态的函数
  state: () => ({
    token: getToken(),
    username: '',
    nickname: '',
    avatar: '',
    introduction: '',
    roles: []
  }),
  // getters
  getters: {

  },
  // actions
  actions: {
    // 用户登录
    login(userInfo:userInfo) {
      // 结构解析
      const { username, password } = userInfo
      return new Promise<void>((resolve, reject) => {
        // 调用接口
        login({ username: username.trim(), password: password })
          .then((response:any) => {
            const { data } = response
            // 存储token
            this.token = data.token
            setToken(data.token)
            resolve()
          }).catch((error:any) => {
            reject(error)
          })
      })
    },

    // 退出登录
    logout() {
      return new Promise<void>((resolve, reject) => {
        // 调用接口
        logout().then(() => {
          this.token = ''
          this.roles = []
          removeToken()

          // reset visited views and cached views
          const tagsView = useTagsViewStore()
          tagsView.delAllViews()

          resolve()
        }).catch((error:any) => {
          reject(error)
        })
      })
    }
  }
})
