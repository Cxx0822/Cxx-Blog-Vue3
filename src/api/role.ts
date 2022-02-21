import request from '@/utils/request'

// 获取所有的角色信息，包括角色的权限信息
export const getAllRoles = ():any => {
  return request({
    url: '/role/allRoles',
    method: 'get'
  })
}

// 获取可以访问某个permission的所有角色信息
export const getRoleNameByPermissionName = (permissionName:string):any => {
  return request({
    url: '/role/getRoleNameByPermissionName',
    method: 'get',
    params: { permissionName }
  })
}

// 分配角色资源
export const assignRoleMenu = (roleId:number, menuList:Array<number>):any => {
  return request({
    url: '/role/assignRoleMenu',
    method: 'post',
    params: { roleId },
    data: menuList
  })
}

// 分配角色操作
export const assignRolePermission = (roleId:number, permissionList:Array<number>):any => {
  return request({
    url: '/role/assignRolePermission',
    method: 'post',
    params: { roleId },
    data: permissionList
  })
}

interface roleInfo {
  roleName:string
  roleDescription?:string
}

// 新建角色
export const createRole = (role:roleInfo):any => {
  return request({
    url: '/role/create',
    method: 'post',
    data: role
  })
}

// 查询角色信息
export const readRole = (roleName:string):any => {
  return request({
    url: '/role/read',
    method: 'get',
    params: { roleName }
  })
}

// 更新角色信息
export const updateRole = (role:string):any => {
  return request({
    url: '/role/update',
    method: 'post',
    data: role
  })
}

// 删除角色信息
export const deleteRole = (roleName:string):any => {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: { roleName }
  })
}
