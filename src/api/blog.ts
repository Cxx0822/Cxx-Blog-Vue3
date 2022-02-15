import request from '@/utils/request'

// api请求接口 注意写法
// 根据用户名获取博客数据
export const getBlogDataByUsername = (username:string, isPublic:boolean, currentPage: number, pageSize: number):any =>
  request({
    url: `/blog/getBlogByUsername?username=` + username + `&isPublic=` + isPublic +
         `&currentPage=` + currentPage + `&pageSize=` + pageSize,
    method: 'get'
  })

// 根据用户名和类别获取博客数据
export const getBlogDataByUsernameAndTypeName = (username:string, typeName:string, isPublic:boolean, currentPage: number, pageSize: number):any =>
  request({
    url: `/blog/getBlogByUsernameAndType?username=` + username + `&typeName=` + typeName + `&isPublic=` + isPublic +
          `&currentPage=` + currentPage + `&pageSize=` + pageSize,
    method: 'get'
  })

export const getBlogDataById = (blogId: number):any =>
  request({
    url: `/blog/getPublicBlog/` + blogId,
    method: 'get'
  })

interface blog {
  id?: number,
  title: string,
  description: string,
  content: string,
  status: number
}

export const createBlog = (blog:blog):any =>
  request({
    url: `/blog/create`,
    method: 'post',
    data: blog
  })

