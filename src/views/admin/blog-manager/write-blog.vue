<template>
  <el-form
    ref="ruleFormRef"
    :model="blogForm"
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item label="文章标题" prop="title">
      <el-input v-model="blogForm.title" placeholder="请输入标题" :disabled="blogId > 0"></el-input>
    </el-form-item>

    <el-form-item label="文章描述">
      <el-input v-model="blogForm.description" placeholder="请输入摘要(默认为正文前100字)"></el-input>
    </el-form-item>

    <el-form-item label="文章正文" prop="content">
      <mavon-editor v-model="blogForm.content" class="mavon-editor"></mavon-editor>
    </el-form-item>

    <el-form-item label="分类" prop="typeName">
      <el-select v-model="blogForm.typeName" class="m-2" placeholder="请选择分类">
        <el-option
          v-for="item in typeInfo.types"
          :key="item.typeName"
          :label="item.typeName"
          :value="item.typeName"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否公开">
      <el-switch v-model="blogForm.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button v-if="blogId > 1" type="primary" @click="submitForm(ruleFormRef, 'create')">新建博客</el-button>
      <el-button v-else type="primary" @click="submitForm(ruleFormRef, 'update')">更新博客</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>,
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useUserStore } from '@/store/user'

import { computeWords } from '@/utils/blog'

import { createBlog, setBlogType, setBlogUser, getBlogDataById, updateBlogDataById } from '@/api/blog'
import { getTypeList } from '@/api/type'

import { useRoute } from 'vue-router'

const route = useRoute()

const userStore = useUserStore()

const ruleFormRef = ref<InstanceType<typeof ElForm>>()

// 博客表单
const blogForm:any = reactive({
  title: '',
  description: '',
  content: '',
  words: 0,
  views: 0,
  status: 0,
  typeName: ''
})

// 类别信息
const typeInfo = reactive({
  types: [{
    id: 0,
    typeName: ''
  }]
})

// 博客ID信息
const blogId = ref(parseInt(route.params.blogId as string))

// 校验规则
const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 45, message: '长度在 3 到 45 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ],
  typeName: [
    { required: true, message: '请选择分类信息', trigger: 'blur' }
  ]
})

// 获取分类表
const getBlogTypes = async() => {
  const { data } = await getTypeList()
  typeInfo.types = data.typeList
}

// 根据id获取博客内容
const getBlogData = async(blogId:number) => {
  const { data } = await getBlogDataById(blogId)
  blogForm.title = data.blogInfo.title
  blogForm.description = data.blogInfo.description
  blogForm.content = data.blogInfo.content
  blogForm.typeName = data.blogInfo.typeName
  blogForm.status = data.blogInfo.status
}

// 初始执行一次
getBlogTypes()
// 如果是编辑博客页面
if (blogId.value) {
  getBlogData(blogId.value)
}

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
const submitForm = (formEl: InstanceType<typeof ElForm> | undefined, submitType:string) => {
  if (!formEl) return
  // 表单校验
  formEl.validate(async(valid) => {
    if (valid) {
      // 统计字数
      blogForm.words = computeWords(blogForm.content)
      // 自动写入博客描述
      autoWrite()
      const blogType = blogForm.typeName
      delete blogForm.typeName

      if (submitType === 'create') {
        // 新建博客
        await createBlog(blogForm)
      } else {
        // 更新博客
        await updateBlogDataById(blogId.value, blogForm)
      }
      // 设置博客作者
      await setBlogUser(blogForm.title, userStore.username)
      // 设置博客类别
      await setBlogType(blogForm.title, blogType)

      if (submitType === 'create') {
        ElMessage.success('新建博客成功')
      } else {
        ElMessage.success('更新博客成功')
      }
    } else {
      ElMessage.error('请正确填写博客信息')
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

<style lang="scss" scoped>
.mavon-editor {
  width: 100%;
  height: 600px;
}

</style>
