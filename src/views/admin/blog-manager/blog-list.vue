<template>
<div class="bloglist-contain">
    <!--博客列表-->
    <el-table
      :data="blogInfo.blogs"
      border
      stripe
      >
      <el-table-column label="序号" type="index" width="50" align="center" />

      <el-table-column label="标题" prop="title" show-overflow-tooltip align="center" />

      <el-table-column label="分类" prop="typeName" width="120" align="center" />

      <el-table-column label="创建时间" prop="createTime" width="170" align="center" sortable />

      <el-table-column label="更新时间" prop="updateTime" width="170" align="center" sortable />

      <!-- TODO：设置分类和作者为筛选模式 -->
      <!-- <el-table-column
        label="是否已公开"
        prop="status"
        width="120"
        align="center"
        :filters="[
          { text: '已公开', value: '1' },
          { text: '未公开', value: '0' },
        ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 1 ? '' : 'success'"
            disable-transitions
            >{{ scope.row.status === 1 ? '已公开': '未公开' }}</el-tag
          >
        </template>
      </el-table-column> -->

      <el-table-column label="是否已公开" prop="status" width="120" align="center">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 1 ? '' : 'success'"
            disable-transitions
            >{{ scope.row.status === 1 ? '已公开': '未公开' }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="作者" width="100" align="center">
        <template v-slot="scope">{{ scope.row.username }}</template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="blog-list">
      <el-pagination
        :current-page=blogInfo.currentPage
        :page-size=blogInfo.pageSize
        :total="blogInfo.total"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="getBlogData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { getBlogDataByUsername } from '@/api/blog'

interface blog {
  id: number,
  title: string,
  description: string,
  views: number,
  words: number,
  username: string,
  typeName: string,
  status: number,
  createTime: string,
  updateTime: string
}

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

// 分页获取博客
const getBlogData = async(currentPage: number) => {
  // TODO 根据登录信息获取实际的用户名
  const { data } = await getBlogDataByUsername('Cxx', false, currentPage, pageMaxSize)

  // 从后端获取数据数据
  blogInfo.blogs = data.blogIPage.records
  blogInfo.currentPage = data.blogIPage.current
  blogInfo.total = data.blogIPage.total
  blogInfo.pageSize = data.blogIPage.size
  blogInfo.pageShow = 1
}

// 筛选状态
// const filterStatus = (value: string, row: blog) => {
//   return row.status === Number(value)
// }

// 编辑博客
const handleEdit = (index: number, row: blog) => {
  console.log(index, row)
}

// 删除博客
const handleDelete = (index: number, row: blog) => {
  console.log(index, row)
}

onMounted(() => {
  // 然后获取第一页的博客信息
  getBlogData(1)
})
</script>

<style lang="scss" scoped>
.blog-list {
  margin-top: 20px;
  text-align: center;
}
</style>
