<template>
  <div class="head-photo" style="width:100%;height:800px">
    <!-- 首页图片 -->
    <img :src=title.titleImage style="width: 100%;height: 100%">

    <div class="banner-container">
      <el-row style="height: 95vh">
        <el-col :span="24" style="height: 100%">
          <el-card shadow="none" class="welcome">
            <!-- 标题栏 -->
            <h1 class="title">
              {{ title.welcome }}
              <div class="border" />
            </h1>

            <!-- 个人介绍 -->
            <h2 class="introduction">
              {{ title.introduction }}
            </h2>

            <!-- 链接 -->
            <div id="waypoint" class="mini-nav" align="center">
              <router-link class="item el-icon-s-home" to="/">
                首页
              </router-link>
              <router-link class="item el-icon-time" to="/archives">
                时间轴
              </router-link>

              <router-link class="item el-icon-edit" to="/friends">
                友人账
              </router-link>
              <router-link class="item el-icon-info" to="/about">
                关于我
              </router-link>
            </div>

            <!-- 向下滚动 -->
            <div class="bounce down" @click="startRead">
              <!-- element ui plus 删除了icon  -->
              <!-- https://element-plus.gitee.io/zh-CN/component/icon.html#icon-usage -->
              <!-- <i class="el-icon-arrow-down" style="color: white" /> -->
              <el-icon class="el-icon-arrow-down" style="color: white">
                <arrow-down />
              </el-icon>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, reactive } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const title = reactive({
  titleImage: 'https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting/2021/04/27/340911.jpg',
  welcome: '欢迎来到Cxx的个人博客',
  introduction: 'Cxx'
})
const emit = defineEmits(['scrollIndex'])

const startRead = () => {
  // 触发父组件事件
  emit('scrollIndex')
}
</script>

<style lang="less">
/* reset element-ui css */
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.head-photo {
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  top: 0;
}
.banner-container {
  line-height: 1.5;
  color: #eee;
  position:absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  height: 100%;
  .welcome {
    background-color: rgba(0, 0, 0, 0.1);
    /*background: transparent!important;*/
    border: none;
    height: 90%;
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
  .introduction {
    letter-spacing: 5px;
    line-height: 50px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-weight: normal;
    color: white;
  }

  .mini-nav {
    position: absolute;
    top: 70%;
    left: 36%;

    .item {
      border-radius: 10em;
      font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
      background: #E0E1E2;
      margin: 0 15px 0 0;
      line-height: 1em;
      text-align: center!important;
      font-style: normal;
      text-decoration: none;

      transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
      opacity: 0.4 !important;
      color: rgba(0,0,0,.6);
      padding: 11px 12px 11px 12px;
      min-height: 1em;
      vertical-align: baseline;

      outline: 0;
    }
  }

  .down {
    animation: bounce 2s infinite;
    animation-duration: 3s;
    font-size: 25px;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .down:hover {
    animation: none;
    cursor: pointer;
    box-shadow: 0 0 20px 0 white;
    transition: all .2s;
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
