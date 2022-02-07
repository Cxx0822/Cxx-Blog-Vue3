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
import Sidebar from '@/layout/blog/components/Sidebar/Index.vue'
import AppMain from '@/layout/blog/components/AppMain.vue'
import Footerbar from '@/layout/blog/components/Footerbar.vue'

</script>

<style lang="scss">
.common-layout {
  padding-left: 80px;
  padding-right: 100px;
  // 设置滚动条
  overflow: auto;

  .el-container {

    .el-container {
      margin-left: 20px;

      .el-main {
        min-height: 800px;
        // 卡片阴影
        background: #fff;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        border-radius: 15px 15px 15px 15px;
        // 继承父属性
        overflow: inherit;
      }
    }

    .el-footer {
      height: 100px;
      margin-top: 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
</style>
