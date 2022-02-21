import { defineStore } from 'pinia'

import { login, logout, getUserRoleInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { useTagsViewStore } from './tagsViews'

import { resetRouter } from '@/router'

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
    token: getToken() as string,
    username: '',
    nickname: '',
    avatar: '',
    introduction: '',
    roles: [] as string[]
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

    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.token === 'estun-wam') {
        // estun-wam用户信息
          const data = {
            roles: ['estun-wam'],
            username: 'estun-wam',
            nickname: 'estun-wam',
            avatar: 'estun-wam.png',
            introduction: 'estun-wam'
          }

          const { roles, username, nickname, avatar, introduction } = data

          // 如果roles为空 这里commit过不去
          this.roles = roles
          this.username = username
          this.nickname = nickname
          this.avatar = avatar
          this.introduction = introduction

          resolve(data)
        } else {
        // 调用getInfo Api接口
        // 这里还不知道用户信息，只能传入token，通过后端解析token获取用户名
          getUserRoleInfo(this.token)
            .then((response:any) => {
              // 注意这里后端传入的数据格式
              const { data } = response.data

              if (!data) {
                reject(new Error('Verification failed, please Login again.'))
              }

              // 获取用户信息
              const { roles, username, nickname, avatar, introduction } = data

              // roles must be a non-empty array
              // roles必须不能为空数组 否则后面的commit过去
              // 如果用户没有roles信息，可以返回空数据，如：roles: [""]
              if (!roles || roles.length <= 0) {
                reject(new Error('getInfo: roles must be a non-null array!'))
              }

              // 如果roles为空 这里commit过不去
              this.roles = roles
              this.username = username
              this.nickname = nickname
              this.avatar = avatar
              this.introduction = introduction
              resolve(data)
            }).catch((error:any) => {
              reject(error)
            })
        }
      })
    },

    // 退出登录
    logout() {
      return new Promise<void>((resolve, reject) => {
        // estun-wam账号
        if (this.token === 'estun-wam') {
          this.token = ''
          this.roles = []
          removeToken()
          resetRouter()

          // reset visited views and cached views
          const tagsView = useTagsViewStore()
          tagsView.delAllViews()

          resolve()
        } else {
          logout().then(() => {
            this.token = ''
            this.roles = []
            removeToken()
            resetRouter()

            // reset visited views and cached views
            const tagsView = useTagsViewStore()
            tagsView.delAllViews()

            resolve()
          }).catch((error:any) => {
            reject(error)
          })
        }
      })
    },

    // 删除Token
    resetToken() {
      return new Promise<void>(resolve => {
        this.token = ''
        this.roles = []
        removeToken()
        resolve()
      })
    }
  }
})
