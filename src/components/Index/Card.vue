<template>
  <div class="card">

    <!-- 卡片头部 头像 -->
    <div class="card-header">
      <el-avatar  :size="50" :src="userInfo.avatar"></el-avatar>
      <p style="margin-top: 0px;">{{ userInfo.username }}</p>
      <el-divider></el-divider>
    </div>

    <!-- 卡片中部 网站链接 -->
    <div class="card-middle">
      <div style="max-width: 40px;margin-left: 40px">
        <el-image
          :src=websiteImage.github
          fit="fill"
          style="cursor:pointer"
          @click="goToGithub"></el-image>
      </div>
    </div>

    <!--卡片底部--个人喜好-->
    <div class="card-footer">
      <el-collapse>
        <el-collapse-item name="1" class="collapse-item" title="最喜欢的动漫">
          <div style="text-align:left">{{ myFavourites.movies }}</div>
        </el-collapse-item>
        <el-collapse-item name="2" class="collapse-item" title="最喜欢的女孩子">
          <div style="text-align:left">{{ myFavourites.girls }}</div>
        </el-collapse-item>
        <el-collapse-item name="3" class="collapse-item" title="最喜欢的游戏">
          <div style="text-align:left">{{ myFavourites.games }}</div>
        </el-collapse-item>
        <el-collapse-item name="4" class="collapse-item" title="最喜欢的颜色">
          <div style="text-align:left">{{ myFavourites.colors }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const userInfo = reactive({
  avatar: 'https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting//website/static/websiteAvatar.webp',
  username: 'Cxx'
})

const websiteImage = reactive({
  github: 'https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting//website/static/githubLogo.webp'
})

const myFavourites = reactive({
  movies: '轻音少女、辉夜大小姐想让我告白、青春猪头少年不会梦到兔女郎学姐、路人女主、辉夜大小姐想让我告白、超炮、俺妹',
  girls: '樱岛麻衣、亚丝娜、高坂桐乃、五更琉璃、英梨梨、珈百璃、、和泉纱雾',
  games: '暂无',
  colors: '蓝色、紫色'
})

const goToGithub = () => {
  window.open('https://github.com/Cxx0822')
}
</script>

<style lang="less">
/* reset element-ui css */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.card {
  width: 250px;
  padding: 20px 0px 0px 0px;
  background-color: white;

  .card-header {
    text-align: center;
  }
  .card-footer {
    margin-top: 10px;

    .collapse-item{
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}
.card:hover {
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 10px 10px;
}
</style>
