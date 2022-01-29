<template>
  <div class="head-photo">
    <!-- 首页图片 -->
    <!-- <img :src=title.titleImage style="display:inline-block;height: auto;max-width: 80%;"> -->

    <div class="banner-container">
      <el-card shadow="none" class="welcome">
        <!-- 标题栏 -->
        <h1 class="title">
          {{ props.title }}
          <div class="border" />
        </h1>

        <!-- 个人介绍 -->
        <h2 class="subTitle">
          {{ props.subTitle }}
        </h2>

      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '欢迎光临本站'
  },
  subTitle: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss">
/* reset element-ui css */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.head-photo {
  text-align: center;
}
.banner-container {
  line-height: 1.5;
  background-color: beige;
  position:absolute;
  top: 0%;
  //left: 5%;
  width: 100%;
  height: 100%;
  .welcome {
    background-color: rgba(0, 0, 0, 0.1);
    /*background: transparent!important;*/
    border: none;
    height: 100%;
    position: relative;
  }
  .title {
    box-sizing: border-box;
    position: relative;
    width: 800px;
    height: 100px;
    line-height: 100px;
    box-shadow: inset 0 0 0 1px white;
    margin: 40px auto;
    margin-top: 80px;
    color: white;
    text-align: center;
    font-size: 50px;
    font-weight: normal;
    letter-spacing: 10px;
    .border {
      width: 812px;
      height: 112px;
      position: absolute;
      top: -6px;
      left: -6px;
      border: 3px solid white;
      box-sizing: border-box;
      animation: clipMe 5s linear infinite;
    }
  }
  .subTitle {
    letter-spacing: 5px;
    line-height: 50px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-weight: normal;
    color: white;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translate(-50%, 0);
    }
    40% {
      transform: translate(-50%, -30px);
    }
    60% {
      transform: translate(-50%, -15px);
    }
  }
  @keyframes clipMe {
    0%,
    100% {
      clip: rect(0px, 806px, 6px, 0px);
    }
    25% {
      clip: rect(0px, 6px, 112px, 0px);
    }
    50% {
      clip: rect(112px, 812px, 112px, 0px);
    }
    75% {
      clip: rect(0px, 812px, 112px, 806px);
    }
  }
}
</style>
