<template>
  <section class="app-main">
    <router-view />
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // 加上底部状态栏50px
  height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
