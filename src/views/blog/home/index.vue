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
      <BlogInfo
        :create-time="blog.createTime.slice(0, 10)"
        :update-time="blog.updateTime.slice(0, 10)"
        :type="blog.typeName"
        :words="blog.words"
        style="text-align: center;">
      </BlogInfo>

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
import { getBlogDataByUsername } from '@/api/blog'

const router = useRouter()

// 每页可显示的博客数量
const pageMaxSize = 5

const blogInfo = reactive({
  // 博客信息
  blogs: [{
    id: 0,
    title: '',
    description: '',
    views: 0,
    words: 0,
    username: '',
    typeName: '',
    status: 0,
    createTime: '',
    updateTime: ''
  }],
  // 分页组件需要的参数 后端获取
  currentPage: 1,
  total: 0,
  pageSize: 0,
  pageShow: 0
})

// 获取博客信息 跳转到博客页
const toBlog = (id: number):void => {
  router.push(`/blog/${id}`)
}

// 分页获取博客
const getBlogData = async(currentPage: number) => {
  // TODO 根据登录信息获取实际的用户名
  const { data } = await getBlogDataByUsername('Cxx', true, currentPage, pageMaxSize)

  // 从后端获取数据数据
  blogInfo.blogs = data.blogIPage.records
  blogInfo.currentPage = data.blogIPage.current
  blogInfo.total = data.blogIPage.total
  blogInfo.pageSize = data.blogIPage.size
  blogInfo.pageShow = 1
}

onMounted(() => {
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
