<template>
  <div>
    <BlogTitle title="文章分类" style="margin-top: 80px;"></BlogTitle>

    <div style="margin-top: 50px;text-align: center;">
      <span>目前共计 {{ 12 }} 个分类</span>
    </div>

    <CategoryInfo></CategoryInfo>

  </div>
</template>

<script setup lang="ts">
import BlogTitle from '@/components/blog/BlogTitle.vue'
import CategoryInfo from '@/components/blog/CategoryInfo.vue'
</script>

<style lang="scss" scoped>
</style>
