<template>
<div class="home-container">
    <!-- 博客卡片显示 -->
    <el-card
      class="home-main-column-middle-card"
      v-for="blog in blogInfo.blogs"
      :body-style="{padding: '0px'}"
      :key="blog.id">

      <!-- 博客标题区域 -->
      <div class="home-title">
        <!-- 点击标题可以跳转 -->
        <!-- <h2>
          <router-link  :to="{name: 'Blog', params: {blogId: blog.id}}" class="blog-link">{{ blog.title }}
          </router-link>
        </h2> -->
        <span style="font-size: small;color: blue">创建时间：{{ blog.createTime.split(' ')[0] }}</span>
        <!-- 添加空格 -->
        &nbsp;
        <span style="font-size: small;color: blue">更新时间：{{ blog.updateTime.split(' ')[0] }}</span>
        &nbsp;
        <span style="font-size: small;color: blue">分类：{{ blog.typeName }}</span>
        &nbsp;
        <span style="font-size: small;color: blue">字数：{{ blog.words }}</span>
      </div>

      <!-- <img :src=blog.firstPicture class="image " v-viewer="{movable: false}"> -->

      <!-- 博客简介区域 -->
      <VueMarkdownIt  class="home-description-markdown-body" :source="blog.description"/>

      <!--阅读全文按钮-->
      <div class="div-btn">
        <a class="color-btn" href="javascript:;" @click.prevent="toBlog(blog.id)">阅读全文</a>
      </div>
    </el-card>

    <div v-if="blogInfo.pageShow" class="home-page">
      <el-pagination
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

import { reactive, inject, onMounted } from 'vue'

const axios: any = inject('axios') // inject axios

const blogInfo = reactive({
  blogs: [{
    id: 0,
    status: 0,
    userId: 0,
    typeId: 0,
    views: 0,
    title: '',
    typeName: '',
    words: 0,
    firstPicture: '',
    description: '',
    createTime: '',
    updateTime: ''
  }],
  types: [{
    id: 0,
    typeName: ''
  }],
  currentPage: 1,
  total: 0,
  pageSize: 5,
  pageShow: 0
})

const toBlog = (id: number):void => {
  console.log(id)
}

// 获取分类表
const getBlogTypes = ():void => {
  // 调用方法
  axios.get('/types')
    .then((res: any) => {
      blogInfo.types = res.data.data
    })
    .catch((error: any) => {
      console.log(error)
    })
}

// 分页获取博客
const getBlogData = (currentPage: number):void => {
  axios.get('/blogs?currentPage=' + currentPage)
    .then((res: any) => {
      // 从后端获取数据数据
      blogInfo.blogs = res.data.data.records
      blogInfo.currentPage = res.data.data.current
      blogInfo.total = res.data.data.total
      blogInfo.pageSize = res.data.data.size
      blogInfo.pageShow = 1

      // 确定分类信息
      for (var i in blogInfo.blogs) {
        for (var j in blogInfo.types) {
          if (blogInfo.blogs[i].typeId === blogInfo.types[j].id) {
            blogInfo.blogs[i].typeName = blogInfo.types[j].typeName
          }
        }
      }
    })
    .catch((error: any) => {
      console.log(error)
    })
}

onMounted(() => {
  // 先从后端获取分类信息
  getBlogTypes()
  // 然后获取第一页的博客信息
  getBlogData(1)
})
</script>

<style lang="less" scoped>
.home-container {
  .home-main-column-middle-card {
    background-color: white;
    margin-bottom: 40px;
    padding: 20px 41px;

    .home-title {
      text-align: center;
    }
    .home-description-markdown-body{
      text-align: left!important;
    }
    .div-btn {
      text-align: center;

      .color-btn {
        text-decoration-line: none;
        padding: 11px 20px;
        color: white;
        font-size: 13px;
        background: linear-gradient(to right, #56ccf2, #2f80ed);
        border-radius: 15px;
        min-width: 90px;
      }
    }
  }

  .home-page{
    text-align: center;
  }
}

</style>
