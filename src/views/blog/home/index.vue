<template>
  <div class="home-container">
    <!-- 博客卡片显示 -->
    <el-card
      shadow="hover"
      class="home-main-column-middle-card"
      v-for="blog in blogInfo.blogs"
      :key="blog.id">

      <!-- 博客标题区域 -->
      <div class="home-title">
        <!-- 点击标题可以跳转 -->
        <el-link style="font-size: 25px;" @click="toBlog(blog.id)">{{ blog.title }}</el-link>
      </div>

      <!-- 博客信息组件 -->
      <BlogInfo style="text-align: center;"></BlogInfo>

      <!-- 博客简介区域 -->
      <VueMarkdownIt  class="home-description-markdown-body" :source="blog.description"/>

      <!--阅读全文按钮-->
      <div class="div-read-blog">
        <el-button @click="toBlog(blog.id)">阅读全文>></el-button>
        <el-divider></el-divider>
      </div>
    </el-card>

    <div v-if="blogInfo.pageShow" class="home-page">
      <el-pagination
        :current-page=blogInfo.currentPage
        :page-size=blogInfo.pageSize
        :total="blogInfo.total"
        background
        layout="prev, pager, next"
        @current-change="getBlogData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入支持Vue3 Markdown的插件
import VueMarkdownIt from 'vue3-markdown-it'
import 'highlight.js/styles/monokai.css'

import BlogInfo from '@/components/blog/BlogInfo.vue'

import { useRouter } from 'vue-router'

import { reactive, onMounted } from 'vue'
import { getPubicBlogData } from '@/api/blog'
import { getTypeList } from '@/api/type'

// 每页可显示的博客数量
const pageMaxSize = 5

const blogInfo = reactive({
  // 博客信息
  blogs: [{
    id: 0,
    status: 0,
    userId: 0,
    typeId: 0,
    views: 0,
    title: '',
    typeName: '',
    words: 0,
    description: '',
    createTime: '',
    updateTime: ''
  }],
  // 类别信息
  types: [{
    id: 0,
    typeName: ''
  }],
  // 分页组件需要的参数 后端获取
  currentPage: 1,
  total: 0,
  pageSize: 0,
  pageShow: 0
})

const router = useRouter()

// 获取博客信息 跳转到博客页
const toBlog = (id: number):void => {
  router.push(`/blog/${id}`)
}

// 获取分类表
const getBlogTypes = async() => {
  const { data } = await getTypeList()
  blogInfo.types = data.typeList
}

// 分页获取博客
const getBlogData = async(currentPage: number) => {
  const { data } = await getPubicBlogData(pageMaxSize, currentPage)

  // 从后端获取数据数据
  blogInfo.blogs = data.blogPage.records
  blogInfo.currentPage = data.blogPage.current
  blogInfo.total = data.blogPage.total
  blogInfo.pageSize = data.blogPage.size
  blogInfo.pageShow = 1

  // 确定分类信息
  for (var i in blogInfo.blogs) {
    for (var j in blogInfo.types) {
      if (blogInfo.blogs[i].typeId === blogInfo.types[j].id) {
        blogInfo.blogs[i].typeName = blogInfo.types[j].typeName
      }
    }
  }
}

onMounted(() => {
  // 先从后端获取分类信息
  getBlogTypes()
  // 然后获取第一页的博客信息
  getBlogData(1)
})
</script>

<style lang="scss">
.home-container {
  .div-read-blog {
    text-align: center;

    .el-button {
      text-align: center;
      height: 25px;
      background-color: #FFF;
      border: 2px solid #87cefa;
      margin-bottom: 50px;
    }

    .el-button:hover {
      background-color: #87cefa;
      color: #FFF;
    }

    .el-divider {
      text-align: center;
      margin: 0 auto;
      background-color: #87cefa;
      width: 10%;
      height: 1.5px;
    }
  }
}
</style>

<style lang="scss" scoped>
.home-container {
  padding: 120px 0 20px 10px;

  .home-main-column-middle-card {
    background-color: #F5F5F5;
    margin-bottom: 40px;
    padding: 20px 41px;

    .home-title {
      text-align: center;
      margin-bottom: 10px;
    }
    .home-description-markdown-body{
      text-align: left!important;
    }
  }
  .home-page{
    text-align: center;
  }
}

</style>
