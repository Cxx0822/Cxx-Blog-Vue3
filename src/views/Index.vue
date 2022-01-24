<template>
  <!-- 首页照片组件 -->
  <HeadPhoto @scrollIndex="scrollIndex"></HeadPhoto>

  <!-- 使用弹性盒子实现左中右结构 -->
  <div class="index-main" id="index" >
    <!-- 左侧卡片 -->
    <div class="index-main-column-left">
      <Card></Card>
    </div>

    <!-- 中间主体区域 -->
    <div class="index-main-column-middle">
      <!-- 路由显示 -->
      <!-- 这里为路由定义中 index路由的子路由 -->
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeadPhoto from '@/components/Index/HeadPhoto.vue'
import Card from '@/components/Index/Card.vue'

// 将元素滚动到浏览器窗口的可见区域
const scrollIndex = () => {
  document.getElementById('index').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
    // inline: 'nearest'
  })
}
</script>

<style lang="less" scoped>
.index-main {
  display: flex;
  margin-top: 70px;
  margin-bottom: 40px;
  padding-top: 20px;
  margin-left: auto !important;
  margin-right: auto !important;

  opacity: 0.97;

  .index-main-column-left{
    padding: 0;
    margin-right: 20px;
    margin-left: 30px;
  }

  .index-main-column-middle {
    flex: 1;
    width: 1400px !important;
    min-height: 700px;
  }

}
</style>
