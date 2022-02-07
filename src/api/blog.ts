import request from '@/utils/request'

// api请求接口 注意写法
export const getPubicBlogData = (pageSize: number, currentPage: number):any =>
  request({
    url: `/blog/getPublicBlogs?currentPage=` + currentPage + `&pageSize=` + pageSize,
    method: 'get'
  })

export const getBlogDataById = (blogId: number):any =>
  request({
    url: `/blog/getPublicBlog/` + blogId,
    method: 'get'
  })

export const getBlogTypeAndNumbers = ():any =>
  request({
    url: `/blog/getBlogTypeAndNumbers`,
    method: 'get'
  })

interface blog {
  id: number,
  title: string,
  description: string,
  content: string,
  typeId: number,
  createTime: string,
  updateTime: string,
  userId?: number,
  words: number,
  views?: number,
  status: number
}

export const createBlog = (blog:blog):any =>
  request({
    url: `/blog/create`,
    method: 'post',
    data: blog
  })
