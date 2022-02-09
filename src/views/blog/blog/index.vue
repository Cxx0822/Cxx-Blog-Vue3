<template>
  <div class="blog-detail">

    <el-card class="box-card">
      <BlogTitle :title="blogInfo.blog.title"></BlogTitle>

      <!-- 博客信息组件 -->
      <BlogInfo
        :create-time="blogInfo.blog.createTime.slice(0, 10)"
        :update-time="blogInfo.blog.updateTime.slice(0, 10)"
        :type="blogInfo.blog.typeName"
        :words="blogInfo.blog.words"
        style="text-align: center;"
      ></BlogInfo>

      <VueMarkdownIt  class="home-content-markdown-body" :source="blogInfo.blog.content"/>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BlogInfo from '@/components/blog/BlogInfo.vue'
import BlogTitle from '@/components/blog/BlogTitle.vue'

// 引入支持Vue3 Markdown的插件
import VueMarkdownIt from 'vue3-markdown-it'
import 'highlight.js/styles/monokai.css'

import { getBlogDataById } from '@/api/blog'

import { useRouter } from 'vue-router'

const blogInfo = reactive({
  blog: {
    id: 0,
    title: '',
    description: '',
    content: '',
    views: 0,
    words: 0,
    username: '',
    typeName: '',
    status: 0,
    createTime: '',
    updateTime: ''
  }
})

const router = useRouter()

// 获取博客信息
const getBlogById = async() => {
  const blogId = router.currentRoute.value.params.blogId
  const { data } = await getBlogDataById(Number(blogId))

  blogInfo.blog.title = data.blogInfo.title
  blogInfo.blog.content = data.blogInfo.content
  blogInfo.blog.createTime = data.blogInfo.createTime
  blogInfo.blog.updateTime = data.blogInfo.updateTime
  blogInfo.blog.typeName = data.blogInfo.typeName
  blogInfo.blog.words = data.blogInfo.words
}

getBlogById()
</script>

<style lang="scss">
.blog-detail {
  .el-card {
    margin-top: 100px;
    margin-left: 20px;
    margin-right: 20px;
    min-height: 700px;
  }
}
</style>

<style lang="scss" scoped>
</style>
