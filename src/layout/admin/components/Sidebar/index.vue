<template>
  <div :class="{'has-logo':showLogo}" class="admin-siderbar-index">
    <logo v-if="showLogo" :collapse="isCollapse" :title="logoInfo.title" :logo="logoInfo.logo"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :unique-opened="false"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        router
      >
        <el-sub-menu index="BlogManager">
          <template #title>
            <i class="fa fa-fw fa-home"></i>
            <span>博客管理</span>
          </template>
          <el-menu-item index="write-blog">
            <i class="fa fa-fw fa-home"></i>
            <span>新建文章</span>
          </el-menu-item>
          <el-menu-item index="blog-list">
            <i class="fa fa-fw fa-home"></i>
            <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="category">
            <i class="fa fa-fw fa-home"></i>
            <span>分类管理</span>
            </el-menu-item>
          <el-menu-item index="comment">
            <i class="fa fa-fw fa-home"></i>
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
import { computed, reactive } from 'vue'

const logoInfo = reactive({
  title: 'NJTECH_Cxx',
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
})

const showLogo = computed(() => true)
const isCollapse = computed(() => false)

</script>

<style lang="scss" scoped>
.admin-siderbar-index {
  padding-top: 10px;
  padding-bottom: 10px;

  i {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
