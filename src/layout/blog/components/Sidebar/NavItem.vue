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
      <!-- 路由路径写完整 -->
      <el-menu-item index = "/blog/home">
        <i class="fa fa-fw fa-home"></i>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/blog/category">
        <i class="fa fa-fw fa-th"></i>
        <span>分类</span>
      </el-menu-item>

      <el-menu-item index="/blog/archives">
        <i class="fa fa-fw fa-archive"></i>
        <span>归档</span>
      </el-menu-item>

      <el-menu-item index="/blog/about">
        <i class="fa fa-fw fa-signal"></i>
        <span>热度排行</span>
      </el-menu-item>

      <!-- <el-menu-item>
        <i class="fa fa-search"></i>
        <span>搜索</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">

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

  i {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
