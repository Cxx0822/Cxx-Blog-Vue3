<template>
  <div class="div-navItem">
    <!-- 路由导航菜单 -->
    <!-- router:开启路由导航 以index作为路径跳转 -->
    <el-menu
        active-text-color="#ffd04b"
        background-color="#FFF"
        class="el-menu-vertical-demo"
        text-color="#000"
        router
      >
        <el-menu-item index="home">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="category">
          <el-icon><Menu /></el-icon>
          <span>分类</span>
        </el-menu-item>

        <el-menu-item index="archives">
          <el-icon><List /></el-icon>
          <span>归档</span>
        </el-menu-item>

        <el-menu-item index="about">
          <el-icon><Histogram /></el-icon>
          <span>热度排行</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled, Menu, List, Histogram } from '@element-plus/icons-vue'

</script>
<style lang="scss">
.div-navItem {
  .el-menu-item {
    height: 40px;
  }
}
</style>

<style lang="scss" scoped>
.div-navItem {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
