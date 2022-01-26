<template>
<!-- 评论输入表单 -->
  <div class="form">
    <h3>
      发表评论
      <el-button
        v-show="realParentCommentId !== -1"
        class="m-small"
        size="mini"
        type="primary"
        @click="toSendParentId()"
      >取消回复
      </el-button>
    </h3>

    <el-form ref="formRef" :model="commentForm" :rules="rules" size="small">
      <el-input
        v-model="commentForm.content"
        :class="'textarea'"
        :rows="5"
        :validate-event="false"
        maxlength="250"
        placeholder="评论千万条，友善第一条"
        show-word-limit
        type="textarea"></el-input>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="nickname">
            <el-popover ref="nicknamePopover" content="输入QQ号将自动拉取昵称和头像" placement="bottom" trigger="focus"></el-popover>
            <el-input
                v-model="commentForm.nickname"
                v-popover:nicknamePopover
                :validate-event="false"
                placeholder="昵称（必填）"
                @blur="onInputBlur">
              <i class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="email">
            <el-popover ref="emailPopover" content="用于接收回复邮件" placement="bottom" trigger="focus"></el-popover>
            <el-input v-model="commentForm.email" v-popover:emailPopover :validate-event="false" placeholder="邮箱（必填）">
              <i class="el-input__icon el-icon-message"></i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="website">
            <el-popover ref="websitePopover" content="可以让我参观一下吗😊" placement="bottom" trigger="focus"></el-popover>
            <el-input
                v-model="commentForm.website"
                v-popover:websitePopover
                :validate-event="false"
                      placeholder="你的网站（可选）">
              <i class="el-input__icon el-icon-map-location"></i>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :offset="1" :span="5">
          <el-form-item>
            <!-- 接口节流  -->
            <el-button size="medium" type="primary"  @mouseenter="beforePost">发表评论</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, reactive } from 'vue'

// 定义接口类型
interface Props{
  realParentCommentId: number,
  realParentCommentNickname: string
}

// 设置默认值
withDefaults(defineProps<Props>(), {
  realParentCommentId: -1,
  realParentCommentNickname: ''
})

// 评论表单
const commentForm = reactive({
  content: '',
  nickname: '',
  email: '',
  website: '',
  avatar: '',
  blogId: '',
  parentCommentId: -1,
  parentCommentNickname: '',
  isAdminComment: -1,
  qq: ''
})

// 邮件校验规则
const checkEmail = (rule: any, value: any, callback: any) => {
// 验证邮箱的正则表达式
  const regEmail = /^\w+@\w+(\.\w+)+$/
  if (regEmail.test(value)) {
    return callback()
  }
  // 返回一个错误提示
  callback(new Error('请输入合法的邮箱'))
}

// 表单校验规则
const rules = reactive({
  nickname: [
    { required: true, message: '请输入评论昵称' },
    { max: 15, message: '昵称不可多于15个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入评论邮箱' },
    { min: 2, max: 30, message: '不可多于30个字符、少于2个字符', trigger: 'blur' },
    { validator: checkEmail }
  ],
  website: [
    { max: 30, message: '不可多于30个字符' }
  ]
})

const toSendParentId = () => {
  console.log('cxx')
}

const onInputBlur = () => {
  console.log('cxx')
}

const beforePost = () => {
  console.log('cxx')
}

</script>

<style lang="less" scoped>
</style>
