<template>
  <div>
    <!-- 添加分类 -->
    <!-- <el-form inline>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addDialogVisible=true">添加分类</el-button>
      </el-form-item>
    </el-form> -->

    <!-- 博客列表 -->
    <el-table
      :data="categoryInfo.types"
      border
      stripe
      >
      <el-table-column label="序号" type="index" width="50" align="center" />

      <el-table-column label="名称" prop="typeName"  align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="category-list">
      <el-pagination
        :current-page=categoryInfo.currentPage
        :page-size=categoryInfo.pageSize
        :total="categoryInfo.total"
        background
        layout="total, prev, pager, next, jumper"
        @current-change="getTypeData"
      >
      </el-pagination>
    </div>

    <!-- <el-dialog v-model="dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getTypeInfo, createType, deleteTypeByName } from '@/api/type'

interface type {
  id: number,
  typeName: string
}

// 每页可显示的类别数量
const pageMaxSize = 5

const categoryInfo = reactive({
  // 博客信息
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

// 分页获取类别数据
const getTypeData = async(currentPage: number) => {
  const { data } = await getTypeInfo(currentPage, pageMaxSize)

  // 从后端获取数据
  categoryInfo.types = data.typeIPage.records
  categoryInfo.currentPage = data.typeIPage.current
  categoryInfo.total = data.typeIPage.total
  categoryInfo.pageSize = data.typeIPage.size
  categoryInfo.pageShow = 1
}

// 编辑博客
const handleEdit = (index: number, row: type) => {
  console.log(index, row)
}

// 删除博客
const handleDelete = (index: number, row: type) => {
  console.log(index, row)
}

getTypeData(1)

</script>

<style lang="scss" scoped>
.category-list {
  margin-top: 20px;
  text-align: center;
}
</style>
