<template>
  <div class="login-container">
    <div class="login">
      <h2>用户登录</h2>

      <!-- 用户名 -->
      <div class="login_box">
        <!-- required不能为空-->
        <input type="text" required />
        <label>用户名</label>
      </div>
      <!-- 密码 -->
      <div class="login_box">
        <input type="password" required />
        <label>密码</label>
      </div>

      <a href="javascript:void(0)">
        登录
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.login-container {
  // 弹性布局 让页面元素垂直+水平居中
  display: flex;
  justify-content: center;
  align-items: center;
  // 让页面始终占浏览器可视区域总高度
  height: 100vh;
  // 背景渐变色
  background: linear-gradient(#141e30, #243b55);
}

.login {
  // 弹性布局 让子元素成为弹性项目
  display: flex;
  // 垂直排列
  flex-direction: column;
  // 水平居中
  align-items: center;

  width: 400px;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);

  h2 {
    color: #fff;
    margin-bottom: 30px;
  }

  .login_box {
    // 相对定位
    position: relative;
    width: 100%;

    input {
      // 清除Input框自带的边框和轮廓
      outline: none;
      border: none;
      width: 100%;
      padding: 10px 0;
      margin-bottom: 30px;
      color: #fff;
      font-size: 16px;
      border-bottom: 1px solid #fff;
      // 背景颜色为透明色
      background-color: transparent;
    }

    label {
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 0;
      color: #fff;
      pointer-events: none;
      // 过渡
      transition: all 0.5s;
    }

    // focus选择器是当input获得焦点时触发
    // vaild选择器是判断input框的内容是否合法
    // 需要在input框中加入required 否则会默认显示
    input:focus + label,
    input:valid + label {
      top: -20px;
      color: #03e9f4;
      font-size: 12px;
    }
  }

  a {
    overflow: hidden;
    position: relative;
    padding: 10px 20px;
    color: #03e9f4;
    // 取消a原有的下划线
    text-decoration: none;
    // 加个过度
    transition: all 0.5s;

    span {
      position: absolute;
    }

    span:first-child {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      // to right就是往右边
      background: linear-gradient(to right, transparent, #03e9f4);
      // 动画 名除 时常 匀速 无限次数
      animation: move1 1s linear infinite;
    }

    span:nth-child(2) {
      right: 0;
      top: -100%;
      width: 2px;
      height: 100%;
      // to right就是往右边
      background: linear-gradient(transparent, #03e9f4);
      // 动画 名除 时常 匀速 无限次数 多了0.25延迟
      animation: move2 1s linear 0.25s infinite;
    }

    span:nth-child(3) {
      right: -100%;
      bottom: 0;
      width: 100%;
      height: 2px;
      // to right就是往右边
      background: linear-gradient(to left, transparent, #03e9f4);
      // 动画 名除 时常 匀速 无限次数 多了0.25延迟
      animation: move3 1s linear 0.25s infinite;
    }

    span:last-child {
      left: 0;
      bottom: -100%;
      width: 2px;
      height: 100%;
      // to right就是往右边
      background: linear-gradient(transparent, #03e9f4);
      // 动画 名除 时常 匀速 无限次数 多了0.25延迟
      animation: move4 1s linear 0.25s infinite;
    }
  }

  a:hover {
    color: #fff;
    border-radius: 5px;
    background-color: #03e9f4;
    box-shadow: 0 0 5px #03e9f4,
                0, 0 25px #03e9f4,
                0, 0, 50px #03e9f4,
                0, 0, 100px #03e9f4;
  }
}

@keyframes move1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes move2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes move3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes move4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
