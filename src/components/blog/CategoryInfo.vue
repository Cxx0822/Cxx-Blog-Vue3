<template>
  <div class="category-info" >
    <ul>
      <li v-for="(category,index) in props.category" :key="index">
        <!-- 待修复bug -->
        <a @click="toCategory(category.typeName)">{{ category.typeName }}</a>
        <span>({{ category.typeNumber }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  category: {
    type: Array,
    require: true
  }
})

const toCategory = (typeName:string) => {
  router.push(`/blog/category/${typeName}`)
}

</script>

<style lang="scss" scoped>
.category-info{
  ul {
    margin-top: 40px;
    margin-left: -20px;
  }

  li {
    list-style-type: none;
    margin-bottom: 5px;
  }

  a {
    margin-right: 5px;
    border-bottom: 1px solid gray; /* #ccc换成链接的颜色 */
    display: inline-block;
    padding-bottom: 1px; /*这里设置你要空的距离*/
  }

  a:hover {
    border-bottom: 1px solid #87cefa; /* #ccc换成链接的颜色 */
    color: #87cefa;
  }

  span {
    color: gray;
  }

}
</style>
