<template>
  <div class="div-footerbar">
    <p>2018-2021 Cxx</p>
    <div>
      <el-link
        type="primary"
        href="https://github.com/Cxx0822/Cxx-Blog-Vue3"
        target="_blank"
        style="font-size: 17px;">
        Vue3.2 + Element UI Plus + TypeScript
      </el-link>

      <el-divider direction="vertical"></el-divider>

      <el-link
        type="primary"
        href="https://github.com/Cxx0822/Cxx-Blog-SpringBoot"
        target="_blank"
        style="font-size: 17px;">
        SpringBoot2.5 + Mybatis Plus3.5 + shiro
      </el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.div-footerbar {
  .el-divider {
    background-color: #000;
    width: 1.5px;
    height: 20px;
  }
}
</style>

<style lang="scss" scoped>
.div-footerbar {
  text-align: center;
}
</style>
