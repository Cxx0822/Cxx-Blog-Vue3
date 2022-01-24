<template>
  <div class="index-container">
    <!-- 首页照片组件 -->
    <HeadPhoto v-if="$route.name==='Home'" @scrollIndex="scrollIndex"></HeadPhoto>

    <!-- 使用弹性盒子实现左中右结构 -->
    <div class="index-main" id="index" >
      <!-- 左侧区域 -->
      <div class="index-main-column-left">
        <Card></Card>
      </div>

      <!-- 中间主体区域 -->
      <div class="index-main-column-middle">
        <!-- 路由显示 -->
        <!-- 这里为路由定义中 index路由的子路由 -->
        <router-view/>
      </div>

      <!-- 右侧区域 -->
      <div class="index-main-column-right">
        <RightCard></RightCard>
        <Calendar></Calendar>
      </div>
    </div>

    <!--回到顶部-->
    <el-backtop style="box-shadow: none;background: none;">
      <img alt="" src="../assets/toTopLogo.webp" style="width: 40px;height: 40px;">
    </el-backtop>

    <!--底部footer-->
    <Footer class="index-foot"></Footer>
  </div>

</template>

<script setup lang="ts">
// 引入子组件
import HeadPhoto from '@/components/Index/HeadPhoto.vue'
import Card from '@/components/Index/Card.vue'
import RightCard from '@/components/Index/RightCard.vue'
import Calendar from '@/components/Index/Calendar.vue'
import Footer from '@/components/Index/Footer.vue'

// 将元素滚动到浏览器窗口的可见区域
const scrollIndex = () => {
  (document.getElementById('index') as any).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
    // inline: 'nearest'
  })
}
</script>

<style lang="less" scoped>
.index-container {
  min-height: 100vh;
  // background-image: url("https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting/2021/04/23/first87.png")!important; ;
  background-repeat: repeat-x;
  background-attachment:fixed;
  background-size:cover;
}
.index-main {
  display: flex;
  margin-top: 70px;
  margin-bottom: 40px;
  padding-top: 20px;
  margin-left: auto !important;
  margin-right: auto !important;
  opacity: 0.97;

  .index-main-column-left{
    padding: 0;
    margin-right: 20px;
    margin-left: 30px;
  }

  .index-main-column-middle {
    flex: 1;
    width: 1400px !important;
    min-height: 700px;
  }

  .index-main-column-right {
    padding: 0;
    margin-left: 20px;
    margin-right: 30px;
  }
}

.index-foot {
  background-color: #333333;
  color: white!important;
  opacity: 0.9;
}
</style>
