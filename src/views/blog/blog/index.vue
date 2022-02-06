<template>
  <div class="blog-detail">

    <div class="mblog">

      <!-- 博客信息组件 -->
      <BlogInfo style="text-align: center;"></BlogInfo>

      <VueMarkdownIt  class="home-content-markdown-body" :source="blogInfo.blog.content"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BlogInfo from '@/components/blog/BlogInfo.vue'

// 引入支持Vue3 Markdown的插件
import VueMarkdownIt from 'vue3-markdown-it'
import 'highlight.js/styles/monokai.css'

import { getBlogDataById } from '@/api/blog'
import { getTypeList } from '@/api/type'

import { useRouter } from 'vue-router'

const blogInfo = reactive({
  blog: {
    id: 0,
    status: 0,
    userId: 0,
    typeId: 0,
    views: 0,
    title: '',
    typeName: '',
    words: 0,
    description: '',
    content: '',
    createTime: '',
    updateTime: ''
  },
  types: [{
    id: 0,
    typeName: ''
  }],
  currentPage: 1,
  total: 0,
  pageSize: 5,
  pageShow: 0
})

const router = useRouter()

// 获取分类表
const getBlogTypes = async() => {
  const { data } = await getTypeList()
  blogInfo.types = data.typeList
}

// 获取博客信息
const getBlogById = async() => {
  const blogId = router.currentRoute.value.params.blogId
  const { data } = await getBlogDataById(Number(blogId))
  blogInfo.blog.content = data.blog.content
}

getBlogTypes()
getBlogById()
</script>

<style lang="scss" scoped>
</style>
