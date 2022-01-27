<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html, body, #app {
  // 设置内部填充为0，几个布局元素之间没有间距
  padding: 0;
  // 外部间距也是如此设置
  margin: 0;
  // 背景颜色
  background-color: #EFEFEF;
  // 统一设置高度为100%
  height: 100%;
}
</style>
