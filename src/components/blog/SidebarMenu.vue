<template>
  <div class="container">
    <!-- --t是自定义属性，通过var函数可调用 -->
    <li style="--t:20%;">
      <a @click="homeClick">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
    </li>
    <li style="--t:30%;">
      <a href="#">
        <i class="fa fa-th-large" aria-hidden="true"></i>
      </a>
    </li>
    <li style="--t:40%;">
      <a @click="loginClick">
        <i class="fa fa-user" aria-hidden="true"></i>
      </a>
    </li>
    <li style="--t:50%;">
      <a href="#">
        <i class="fa fa-cog" aria-hidden="true"></i>
      </a>
    </li>
    <li style="--t:60%;">
      <a href="#">
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </a>
    </li>
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const homeClick = () => {
  router.push({ path: '/blog' })
}

const loginClick = () => {
  router.push({ path: '/login' })
}
</script>

<style lang="scss" scoped>
.container {
  width: 15px;
  height: 500px;
  /* 绝对固定定位 */
  position: fixed;
  left: 0;
  /* 垂直居中 */
  top: 50%;
  transform: translateY(-50%);
  background-color: #222;
  /* 右上右下圆角 */
  border-radius: 0 15px 15px 0;
  overflow: hidden;
  /* 动画过渡 */
  transition: 0.3s;

  .top {
    width: calc(100% - 30px);
    margin-left: 30px;
    height: 20%;
    background-color: #222;
    border-radius: 0 0 0 20px;
    /* 动画过渡 */
    transition: 0.2s;
  }
  .middle {
    width: calc(100% - 60px);
    height: 10%;
    background-color: lightseagreen;
    margin-left: 40px;
    border-radius: 20px;
  }
  .bottom {
    width: calc(100% - 30px);
    height: 100%;
    margin-left: 30px;
    background-color: #222;
    border-radius: 20px 0 0 0;
  }

  li {
    /* 绝对定位 */
    position: absolute;
    /* 通过var函数调用自定义属性--t */
    top: var(--t);
    width: 100%;
    height: 10%;
    font-size: 30px;
    /* 弹性布局 水平垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      /* 字体颜色透明 */
      color: transparent;
      /* 动画过渡 */
      transition: 0.3s;
    }
  }

  /* 分别为每一个li元素设置.top的高度 */
  /* ~是兄弟选择器 */
  li:nth-child(1):hover ~ .top{
    height: 20%;
  }
  li:nth-child(2):hover ~ .top{
    height: 30%;
  }
  li:nth-child(3):hover ~ .top{
    height: 40%;
  }
  li:nth-child(4):hover ~ .top{
    height: 50%;
  }
  li:nth-child(5):hover ~ .top{
    height: 60%;
  }
}
.container:hover {
  /* 鼠标移入，展开+改变圆角大小 */
  width: 130px;
  border-radius: 0 30px 30px 0;
}
.container:hover li a{
  /* 鼠标移入，改变字体颜色 */
  color: #fff;
}
.container::before{
  content: "";
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: lightseagreen;
}
</style>
