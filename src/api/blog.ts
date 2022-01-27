import request from '@/utils/request'

// api请求接口 注意写法
export const getPubicBlogData = (currentPage: number):any =>
  request({
    url: `/blog/getPublicBlogs?currentPage=` + currentPage,
    method: 'get'
  })
