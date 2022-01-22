<template>
  <div class="card">

    <!-- 卡片头部 头像 -->
    <div class="card-header">
      <el-avatar  :size="50" :src="userInfo.avatar"></el-avatar>
      <p>{{ userInfo.username }}</p>
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const userInfo = reactive({
  avatar: 'https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting//website/static/websiteAvatar.webp',
  username: 'Cxx'
})
</script>

<style lang="less">
/* reset element-ui css */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
