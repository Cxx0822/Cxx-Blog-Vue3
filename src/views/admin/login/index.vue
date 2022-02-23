<template>
  <div class="login-container">
    <div class="title-container">
      <h1 class="title">Cxx博客网站管理系统</h1>
    </div>

    <!-- 登录表单 -->
    <el-form
      ref="loginFormRef"
      :model="loginInfo.loginForm"
      :rules="loginInfo.loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left">
      <!-- username表单选项 -->
      <el-form-item prop="username">
        <!-- username图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- username输入框 -->
        <el-input
          ref="usernameRef"
          v-model="loginInfo.loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <!-- 大写提示 -->
      <el-tooltip v-model="loginInfo.capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <!-- @keyup.native绑定按键事件，检查是否输入了大写 -->
          <!-- @keyup.enter.native绑定按键的回车事件 -->
          <el-input
            :key="loginInfo.passwordType"
            ref="passwordRef"
            v-model="loginInfo.loginForm.password"
            :type="loginInfo.passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="loginInfo.capsTooltip = false"
            @keyup.enter="handleLogin(loginFormRef)"
          />
          <!-- 显示密码图标 -->
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="loginInfo.passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loginInfo.loading"
        type="primary"
        style="width:100%;margin-bottom:30px;font-size:18px"
        @click.prevent="handleLogin(loginFormRef)"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'
import type { ElForm } from 'element-plus'

import { removeToken } from '@/utils/auth'

// DOM元素的引用
const usernameRef = ref()
const passwordRef = ref()

// 表单引用 固定格式
type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()

const userStore = useUserStore()

const router = useRouter()

// 用户名验证
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length < 1) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}

// 密码验证
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 1) {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

// 登录页面数据
const loginInfo = reactive({
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  passwordType: 'password',
  capsTooltip: false,
  loading: false,
  showDialog: false,
  redirect: undefined,
  otherQuery: {}
})

onMounted(() => {
  // 如果用户名/密码为空 获取输入框焦点
  if (loginInfo.loginForm.username === '') {
    usernameRef.value.focus()
  } else if (loginInfo.loginForm.password === '') {
    passwordRef.value.focus()
  }
})

// 是否开启大写模式
const checkCapslock = (keyevent:KeyboardEvent) => {
  const { key } = keyevent
  loginInfo.capsTooltip = Boolean(key && key.length === 1 && (key >= 'A' && key <= 'Z'))
}

// 显示密码
const showPwd = () => {
  if (loginInfo.passwordType === 'password') {
    loginInfo.passwordType = ''
  } else {
    loginInfo.passwordType = 'password'
  }
  // 重新获取焦点
  nextTick(() => {
    passwordRef.value.focus()
  })
}

// 处理登录事件
// 这里需要传入表单的ref
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loginInfo.loading = true

      // 删除token 防止之前未正确退出 遗留在浏览器中的token
      removeToken()

      userStore.login(loginInfo.loginForm)
        .then(() => {
          // 跳转路由
          router.push('/blog-manager')
          ElMessage.success('登录成功')
          loginInfo.loading = false
        })
        .catch(() => {
          loginInfo.loading = false
        })
    } else {
      ElMessage.error('请输入正确的用户名和密码')
      return false
    }
  })
}

// 更改state中的变量 可以批量更新
// const changeState = () => {
//   userStore.$patch(state => {
//     state.username = 'Cxx'
//   })
// }
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#000000;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $bg;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: $bg;
  }
}
</style>

<style lang="scss" scoped>
$bg:#000000;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  // // 添加背景图片
  // background: url("../../assets/logo/login.png");
  // background-repeat: no-repeat;  // 只显示一次
  // background-size: 100% 100%;
  // background-color: #E8E8E8;
  background-color: white;

  // 背景图片自适应大小
  .div-login-image {
    position:absolute;
    left:10%;
    top:15%;
    width: calc(100vh - 200px);
    height: calc(100vh - 200px);

    .img-login {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .login-form {
    // 表单靠右居中
    position: absolute;
    right: 10%;
    top: 35%;

    width: 400px;
    max-width: 100%;
    padding: 20px 20px 0;
    margin: 0 auto;
    overflow: hidden;

    // 添加外边框
    border-radius: 10px;
    border: 2px solid #008B93;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #000000;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: $bg;
      margin-top: 30px;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
