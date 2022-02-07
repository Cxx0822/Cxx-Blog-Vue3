<template>
  <div class="category-info" >
    <ul>
      <li v-for="(category,index) in categories" :key="index">
        <a href="www.baidu.com">{{category.typeName}}</a>
        <span>({{category.typeNumber}})</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { getBlogTypeAndNumbers } from '@/api/blog'

const categories = reactive(
  [{
    typeName: '',
    typeNumber: 0
  }]
)

// 获取博客类别信息
const getBlogTypeInfo = async() => {
  const { data } = await getBlogTypeAndNumbers()
  for (var i in data.typeCountInfoList) {
    // categories[i].typeName = data.typeCountInfo.typeName

    console.log(i)
    console.log(data.typeCountInfoList[i])
  }
}

getBlogTypeInfo()

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
