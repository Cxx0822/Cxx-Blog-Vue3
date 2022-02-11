import request from '@/utils/request'

export const getTypeList = ():any =>
  request({
    url: `/type/listAll`,
    method: 'get'
  })

export const getBlogTypeAndNumbers = ():any =>
  request({
    url: `/type/getBlogTypeAndNumbers`,
    method: 'get'
  })

export const getTypeInfo = (currentPage: number, pageSize: number):any =>
  request({
    url: `/type/getAllTypeInfo?currentPage=` + currentPage + `&pageSize=` + pageSize,
    method: 'get'
  })

interface type {
  id?: number,
  typeName: string
}

export const createType = (type: type):any =>
  request({
    url: `/type/create`,
    method: 'post',
    data: type
  })

export const deleteTypeByName = (typeName: string):any =>
  request({
    url: `/type/deleteByName?typeName=` + typeName,
    method: 'delete'
  })
