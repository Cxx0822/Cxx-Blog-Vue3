<template>
  <el-form
    ref="ruleFormRef"
    :model="blogForm"
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="blogForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>

    <el-form-item label="文章描述" prop="description">
      <el-input v-model="blogForm.description" placeholder="请输入摘要(默认为正文前100字)"></el-input>
    </el-form-item>

    <el-form-item label="文章正文" prop="content">
      <mavon-editor v-model="blogForm.content"></mavon-editor>
    </el-form-item>

    <el-form-item label="分类">
      <el-select :allow-create="true" :filterable="true" placeholder="请选择分类（输入可添加新分类）" style="width: 100%;">
      <el-option v-for="type in typeInfo.types" :key="type.id" :label="type.typeName" :value="type.id"></el-option>
    </el-select>
    </el-form-item>

    <el-form-item label="是否公开">
      <el-switch v-model="blogForm.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">新建博客</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

import { computeWords } from '@/utils/blog'

import { createBlog } from '@/api/blog'
import { getTypeList } from '@/api/type'

const ruleFormRef = ref<InstanceType<typeof ElForm>>()

// 博客表单
const blogForm = reactive({
  id: 0,
  title: '',
  description: '',
  content: '',
  typeId: 0,
  createTime: '',
  updateTime: '',
  userId: 1,
  words: 0,
  views: 0,
  status: 0
})

// 类别信息
const typeInfo = reactive({
  types: [{
    id: 0,
    typeName: ''
  }]
})

// 校验规则
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 45, message: '长度在 3 到 45 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ]
})

// 获取分类表
const getBlogTypes = async() => {
  const { data } = await getTypeList()
  typeInfo.types = data.typeList
}

// 初始执行一次
getBlogTypes()

// 将正文的内容前100字自动写入文章描述中
const autoWrite = () => {
  // 如果博客描述为空
  if (blogForm.description.length === 0) {
    if (blogForm.content.length < 100) {
      blogForm.description = blogForm.content.substring(0, blogForm.content.length)
    } else {
      blogForm.description = blogForm.content.substring(0, 100)
    }
  }
}

// 提交表单
const submitForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  // 表单校验
  formEl.validate(async(valid) => {
    if (valid) {
      // 统计字数
      blogForm.words = computeWords(blogForm.content)
      // 自动写入博客描述
      autoWrite()
      // 新建博客
      await createBlog(blogForm)
      ElMessage.success('新建博客成功')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 重置表单
const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
