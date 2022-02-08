<template>
  <div class="category-name">
    <el-timeline>
      <el-timeline-item size="large" :timestamp="route.params.name" placement="top">
        <!-- 博客卡片显示 -->
        <el-card
          shadow="hover"
          v-for="blog in categoryNameInfo.blogs"
          :key="blog.id">

          <!-- 博客标题区域 -->
          <div class="home-title">
            <!-- 点击标题可以跳转 -->
            <el-link :underline="false" @click="toBlog(blog.id)">
              <span style="font-size: 14px">{{ blog.createTime.slice(0, 10) }}</span>
              &nbsp;
              <span>{{ blog.title }}</span>
            </el-link>
            <el-divider border-style="dashed"></el-divider>
          </div>
        </el-card>

      </el-timeline-item>

      <el-timeline-item size="large" placement="top" >
      </el-timeline-item>
    </el-timeline>

    <div class="home-page">
      <el-pagination
        :current-page=categoryNameInfo.currentPage
        :page-size=categoryNameInfo.pageSize
        :total="categoryNameInfo.total"
        background
        layout="prev, pager, next"
        @current-change="getBlogData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getPublicBlogsByTypeName } from '@/api/blog'

const route = useRoute()
const router = useRouter()

// 每页可显示的博客数量
const pageMaxSize = 5

const categoryNameInfo = reactive({
  // 博客信息
  blogs: [{
    id: 0,
    title: '',
    createTime: ''
  }],
  // 分页组件需要的参数 后端获取
  currentPage: 1,
  total: 0,
  pageSize: 0,
  pageShow: 0
})

const getBlogData = async(currentPage: number) => {
  const { data } = await getPublicBlogsByTypeName(pageMaxSize, currentPage, route.params.name)

  // 从后端获取数据数据
  categoryNameInfo.blogs = data.blogInfoList.records
  categoryNameInfo.currentPage = data.blogInfoList.current
  categoryNameInfo.total = data.blogInfoList.total
  categoryNameInfo.pageSize = data.blogInfoList.size
}

// 获取博客信息 跳转到博客页
const toBlog = (id: number):void => {
  router.push(`/blog/${id}`)
}

getBlogData(1)

</script>

<style lang="scss">
.category-name {
  margin-top: 80px;

  .el-timeline-item {
    font-size: 16px;
  }

  .el-timeline-item__wrapper {
    // 标题
    .el-timeline-item__timestamp.is-top {
      font-size: 25px;
      margin-bottom: 40px;
    }
    //  内容
    .el-timeline-item__content {
      color: #8393b0;
    }
  }

  .el-card {
    margin-left: -23px;
    background-color: rgb(253, 253, 253);
  }

  .el-card:hover {
    .el-divider {
      background-color: black;
    }
  }

  .el-link {
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>
.category-name {
  .home-page {
    text-align: center;
  }
}
</style>
