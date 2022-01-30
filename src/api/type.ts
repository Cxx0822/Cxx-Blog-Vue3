import request from '@/utils/request'

export const getTypeList = ():any =>
  request({
    url: `/type/listAll`,
    method: 'get'
  })
