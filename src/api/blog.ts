import request from '@/utils/request'

// api请求接口 注意写法
export const getPubicBlogData = (currentPage: number):any =>
  request({
    url: `/blog/getPublicBlogs?currentPage=` + currentPage,
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
