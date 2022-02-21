<template>
  <div>
    <!-- 添加分类 -->
    <el-form inline>
      <el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addOrUpdateTypeName('add')">添加分类</el-button>
      </el-form-item>
    </el-form>

    <!-- 博客列表 -->
    <el-table
      :data="categoryInfo.types"
      border
      stripe
      >
      <el-table-column label="序号" type="index" width="100" align="center" />

      <el-table-column label="名称" prop="typeName"  align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template #default="scope">
          <el-button @click="addOrUpdateTypeName('update', scope.row.typeName)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.typeName)">删除</el-button>
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

    <el-dialog
      v-model="dialogInfo.addOrUpdateDialogVisible"
      :title="dialogInfo.addOrUpdateDialogtitle">
      <el-form :model="categoryInfo.types">
        <el-form-item label="分类名称">
          <el-input v-model="categoryInfo.newType.typeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogInfo.addOrUpdateDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddOrUpdateDialog">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getTypeInfo, createType, updateType, deleteTypeByName } from '@/api/type'

import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 每页可显示的类别数量
const pageMaxSize = 5

const categoryInfo = reactive({
  // 博客信息
  types: [{
    typeName: ''
  }],
  newType: {
    typeName: ''
  },
  oldTypeName: '',
  // 分页组件需要的参数 后端获取
  currentPage: 1,
  total: 0,
  pageSize: 0,
  pageShow: 0
})

const dialogInfo = reactive({
  addOrUpdateDialogVisible: false,
  addOrUpdateDialogtitle: ''
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

// 初始化获取数据
getTypeData(1)

// 删除类别信息
const handleDelete = (typeName: string) => {
  ElMessageBox.confirm(
    '确定删除此类别信息?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async() => {
      await deleteTypeByName(typeName)
      ElMessage.success('删除成功')
      getTypeData(1)
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

// 增加/修改类别信息
const addOrUpdateTypeName = (option: string, typeName?: string) => {
  switch (option) {
    case 'add':
      categoryInfo.newType.typeName = ''
      dialogInfo.addOrUpdateDialogtitle = '增加类别'
      dialogInfo.addOrUpdateDialogVisible = true
      break
    case 'update':
      categoryInfo.newType.typeName = typeName as string
      categoryInfo.oldTypeName = typeName as string
      dialogInfo.addOrUpdateDialogtitle = '更新类别'
      dialogInfo.addOrUpdateDialogVisible = true
      break
    default:
      dialogInfo.addOrUpdateDialogVisible = false
      break
  }
}

// 确定新增/修改类别信息
const confirmAddOrUpdateDialog = async() => {
  if (categoryInfo.newType.typeName === '') {
    ElMessage.error('请输入分类名称')
  } else {
    switch (dialogInfo.addOrUpdateDialogtitle) {
      case '增加类别':
        await createType(categoryInfo.newType)
        ElMessage.success('新增成功')
        break
      case '更新类别':
        await updateType(categoryInfo.newType, categoryInfo.oldTypeName)
        ElMessage.success('更新成功')
        break
    }
  }

  getTypeData(1)
  dialogInfo.addOrUpdateDialogVisible = false
}

</script>

<style lang="scss" scoped>
.category-list {
  margin-top: 20px;
  text-align: center;
}
</style>
