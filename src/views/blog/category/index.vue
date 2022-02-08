<template>
  <div>
    <BlogTitle title="文章分类" style="margin-top: 80px;"></BlogTitle>

    <div style="margin-top: 50px;text-align: center;">
      <span>目前共计 {{ categoryInfo.category.length }} 个分类</span>
    </div>

    <CategoryInfo :category="categoryInfo.category"></CategoryInfo>

  </div>
</template>

<script setup lang="ts">
import BlogTitle from '@/components/blog/BlogTitle.vue'
import CategoryInfo from '@/components/blog/CategoryInfo.vue'

import { reactive } from 'vue'

import { getBlogTypeAndNumbers } from '@/api/type'

const categoryInfo = reactive({
  category: [{
    typeName: '',
    typeNumber: 0
  }]
})

// 获取博客类别信息
const getBlogTypeInfo = async() => {
  const { data } = await getBlogTypeAndNumbers()
  categoryInfo.category = data.typeCountInfoList
}

getBlogTypeInfo()
</script>

<style lang="scss" scoped>
</style>
