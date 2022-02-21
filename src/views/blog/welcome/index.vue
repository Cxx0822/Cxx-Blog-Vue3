<template>
  <div class="welcome-container">
    <!-- 首页欢迎标题组件 -->
    <BlogWelcome :title="welcomeInfo.title" :subTitle="welcomeInfo.subTltle" ></BlogWelcome>

    <!-- 侧边栏按钮 -->
    <sidebar-menu></sidebar-menu>

    <!-- 开始阅读 -->
    <div class="bounce down">
      <h3 style="color: blueviolet;">~开启阅读之旅吧~</h3>
      <el-icon class="icon-down" style="color: white"  @click="startRead">
        <arrow-down />
      </el-icon>
    </div>

    <!--回到顶部-->
    <el-backtop style="box-shadow: none;background: none;">
      <img alt="" src="@/assets/toTopLogo.webp" style="width: 40px;height: 40px;">
    </el-backtop>
  </div>

</template>

<script setup lang="ts">
// 引入子组件
import BlogWelcome from '@/components/blog/BlogWelcome.vue'
import SidebarMenu from '@/components/blog/SidebarMenu.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { reactive } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const welcomeInfo = reactive({
  title: '欢用来到Cxx的个人博客',
  subTltle: ''
})

// 跳转到博客页面
const startRead = () => {
  router.push({ path: '/blog' })
}
</script>

<style lang="scss" scoped>
.welcome-container {
  .down {
    animation: bounce 2s infinite;
    animation-duration: 3s;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    // display: flex;
    // justify-content: center;
    // align-items: center;

    text-align: center;

    .icon-down {
      font-size: 25px;

      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #fff;

    }

    .icon-down:hover {
      cursor: pointer;
      box-shadow: 0 0 20px 0 white;
      transition: all .2s;
    }
  }
  .down:hover {
    animation: none;
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
