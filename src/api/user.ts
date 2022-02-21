import request from '@/utils/request'

interface userInfo {
  username: string,
  password: string,
  salt?: string,
  nickname?: string,
  avatar?: string,
  email?: string,
  status?: boolean
}

// 登录，参数为 用户对象数据，需包含用户名和密码
export const login = (userInfo: userInfo):any =>
  request({
    url: '/user/login',
    method: 'post',
    data: userInfo
  })

// 获取单个用户信息，参数为token
export const getUserRoleInfo = (token: string):any =>
  request({
    url: '/user/roleInfo',
    method: 'get',
    // 需要token参数
    params: { token }
  })

// 获取所有用户信息，包括用户的角色信息
export const getAllUserRoleInfo = ():any =>
  request({
    url: '/user/allRoleInfo',
    method: 'get'
  })

// 获取所有路由信息，供前端过滤和渲染
export const getRoutes = ():any =>
  request({
    url: '/user/routes',
    method: 'get'
  })

// 分配用户角色 参数： 用户名 角色名
export const assignUserRoles = (username:string, roleName:string):any =>
  request({
    url: '/user/assignUserRole',
    method: 'post',
    params: { username, roleName }
  })

// 新建用户 参数：用户信息
export const createUser = (userInfo:userInfo):any =>
  request({
    url: '/user/create',
    method: 'post',
    data: userInfo
  })

// 删除用户 参数：用户名
export const deleteUser = (username:string):any =>
  request({
    url: '/user/delete',
    method: 'delete',
    params: { username }
  })

// 更新用户 参数：用户信息
export const updateUser = (userInfo:userInfo):any =>
  request({
    url: '/user/update',
    method: 'post',
    data: userInfo
  })

// 查询用户 参数：用户名
export const readUser = (username:string):any =>
  request({
    url: '/user/read',
    method: 'get',
    params: { username }
  })

// 退出登录
export const logout = ():any =>
  request({
    url: '/user/logout',
    method: 'post'
  })
