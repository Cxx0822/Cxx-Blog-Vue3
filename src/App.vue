<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html, body, #app {
  margin: 0;
  // 背景颜色
  background-color: #EFEFEF;
  // 统一设置高度为100%
  height: 100%;
}

h1, h2, h3, h4, h5, h6 {
  margin: 20px 0 15px;
  padding: 0;
  font-weight: bold;
  line-height: 1.5;
  font-family: 'Roboto Slab', 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
}

</style>
