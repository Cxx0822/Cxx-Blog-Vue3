<template>
  <!-- 首页照片组件 -->
  <HeadPhoto @scrollIndex="scrollIndex"></HeadPhoto>

  <!--使用弹性盒子实现左中右结构-->
  <div class="index-main" id="index" >
  </div>
</template>

<script setup lang="ts">
import HeadPhoto from '@/components/Index/HeadPhoto.vue'

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

}
</style>
