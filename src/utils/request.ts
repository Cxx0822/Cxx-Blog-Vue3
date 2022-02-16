import axios, { AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import { getToken } from '@/utils/auth'

import { useUserStore } from '@/store/user'
// pinia的非组件使用：https://pinia.vuejs.org/core-concepts/outside-component-usage.html
// const userStore = useUserStore()

const service = axios.create({
  // URL地址
  baseURL: process.env.VUE_APP_BASE_API,
  // 连接时间
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  // 这里要将原来的类型AxiosRequestConfig设置为类型为any 否则会编译不过
  (config: any) => {
    const userStore = useUserStore()
    // 如果有token 则加上token值
    if (userStore.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 如果状态码不是20000
    // 根据实际的后端接口确定状态码
    if (res.code !== 20000) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          const userStore = useUserStore()
          // 重置token
          userStore.resetToken().then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 正确则返回数据
      return res
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
