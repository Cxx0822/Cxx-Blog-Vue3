<template>
  <!-- 全局布局组件 -->
  <div class="common-layout">
    <el-container>
      <el-aside>
        <!-- 侧边栏区域 -->
        <Sidebar />
      </el-aside>

      <el-container>
        <!-- 主体区域 -->
        <el-main>
          <AppMain />
        </el-main>

        <!-- 底部区域 -->
        <el-footer>
          <Footerbar />
        </el-footer>
      </el-container>

    </el-container>

  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/layout/components/Sidebar/Index.vue'
import AppMain from '@/layout/components/AppMain.vue'
import Footerbar from '@/layout/components/Footerbar.vue'

</script>

<style lang="scss">
.common-layout {
  padding-left: 100px;
  padding-right: 100px;

  .el-container {
    // 底部留点空白
    height: calc(100vh - 10px);

    .el-aside {
       width: 240px
      // background-color: goldenrod;
    }

    .el-container {
      margin-left: 20px;

      .el-main {
        background-color: royalblue;
        // 继承父属性
        overflow: inherit;
      }
    }

    .el-footer {
      height: 100px;
      margin-top: 10px;
      background-color: burlywood;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .fixed-footer {
    width: 100%;
    position: absolute;
    bottom: 0px
  }
}
</style>
