<template>
  <div class="div-blog-info">
    <div>
      <span style="color: #7D26CD;">
        <i class="fa fa-thumb-tack"> 置顶</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span style="color: #7D26CD;">
        <i class="fa fa-newspaper-o" style="background: #7d26cd;padding: 2px 4px 2px 4px;color: #fff;">精品</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span>
        <i class="fa fa-calendar-o"> 发表于 {{ props.createTime }}</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span>
        <i class="fa fa-calendar-check-o"> 更新于 {{ props.updateTime }}</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span>
        <i class="fa fa-folder-o"> 分类于 {{ props.type }}</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <!-- <span>
        <i class="fa fa-comment-o"> 评论数 {{ props.comments }}</i>
      </span> -->
    </div>

    <div style="margin-top: 5px;">

      <span>
        <i class="fa fa-file-word-o"> 本文字数: {{ props.words }}字</i>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span>
        <i class="fa fa-clock-o"> 阅读时长≈ {{ Math.floor(props.words / 150 ) }}分钟</i>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  createTime: {
    type: String,
    require: true
  },
  updateTime: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  words: {
    type: Number,
    required: true
  }
})

</script>

<style lang="scss">
.div-blog-info {
  .el-divider {
    background-color: #8B8989;
    width: 1px;
    height: 12px;
  }
}
</style>

<style lang="scss" scoped>
.div-blog-info {
  span {
    color: #999;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    margin-right: 5px;
  }
  i {
    vertical-align: middle;
  }
}
</style>
