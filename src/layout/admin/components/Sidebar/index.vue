<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        mode="vertical"
        router
      >
        <el-sub-menu index="/admin/blog-manager/blog-manager">
          <template #title>
            <el-icon><Menu /></el-icon>
            <span>博客管理</span>
          </template>
          <el-menu-item index="/admin/blog-manager/write-blog">
            <el-icon><edit /></el-icon>
            <span>新建文章</span>
          </el-menu-item>
          <el-menu-item index="/admin/blog-manager/blog-list">
            <el-icon><files /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/blog-manager/category-manager">
            <el-icon><opportunity /></el-icon>
            <span>分类管理</span>
            </el-menu-item>
          <el-menu-item index="/admin/blog-manager/comment">
            <el-icon><comment /></el-icon>
            <span>评论管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { computed } from 'vue'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'

import { Menu, Edit, Files, Opportunity, Comment } from '@element-plus/icons'

const settings = useSettingsStore()
const app = useAppStore()

const showLogo = computed(() => settings.sidebarLogo)
const isCollapse = computed(() => !app.sidebar.opened)

</script>

<style lang="scss" scoped>

</style>
