<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <template>
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

      </template>

      <!-- 右上角选项卡 -->
      <el-dropdown  class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="@/assets/user.png" class="user-avatar">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/blog">
              <el-dropdown-item>查看博客</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
              <el-dropdown-item>Github地址</el-dropdown-item>
            </a>

            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item>文档地址</el-dropdown-item>
            </a>

            <el-dropdown-item divided @click="logout">
              <span style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'

import Hamburger from '@/components/admin/Hamburger/index.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const router = useRouter()

const appStore = useAppStore()
const userStore = useUserStore()

const sidebar = computed(() => appStore.sidebar)

// 侧边栏控制
const toggleSideBar = () => {
  appStore.toggleSideBar()
}

// 退出登录
const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
