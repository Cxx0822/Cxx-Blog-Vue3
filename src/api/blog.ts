import request from '@/utils/request'
interface blog {
  id?: number,
  title: string,
  description: string,
  content: string,
  status: number
}

// api请求接口 注意写法
// 获取所有博客数据
export const getAllBlogInfo = (isPublic:boolean, currentPage: number, pageSize: number):any =>
  request({
    url: `/blog/getAllBlogInfo?isPublic=` + isPublic +
         `&currentPage=` + currentPage + `&pageSize=` + pageSize,
    method: 'get'
  })

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

// 根据博客id获取博客数据
export const getBlogDataById = (blogId: number):any =>
  request({
    url: `/blog/getPublicBlog/` + blogId,
    method: 'get'
  })

// 根据博客i更新博客数据
export const updateBlogDataById = (blogId: number, blog:blog):any =>
  request({
    url: `/blog/updateById?blogId=` + blogId,
    method: 'post',
    data: blog
  })

// 新建博客
export const createBlog = (blog:blog):any =>
  request({
    url: `/blog/create`,
    method: 'post',
    data: blog
  })

// 设置博客作者信息
export const setBlogUser = (blogName:string, username:string):any =>
  request({
    url: `/blog/setBlogUser?blogName=` + encodeURIComponent(blogName) +
      `&username=` + encodeURIComponent(username),
    method: 'post'
  })

// 设置博客类别信息
export const setBlogType = (blogName:string, typeName:string):any =>
  request({
    url: `/blog/setBlogType?blogName=` + encodeURIComponent(blogName) +
      `&typeName=` + encodeURIComponent(typeName),
    method: 'post'
  })
