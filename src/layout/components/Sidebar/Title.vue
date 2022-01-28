<template>
  <div class="title">
    <span class="span-title">{{ titleName.title }}</span>
    <br>
    <p class="p-subtitle">{{ titleName.subTitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const titleName = reactive({
  title: 'NJTECH_Cxx',
  subTitle: '不要因为别人5%的负面评价而否定自己100%的努力。'
})
</script>

<style lang="scss" scoped>
.title {
  background-color: #87cefa;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;

  .span-title {
    color: #FFF;
    display: inline-block;
    vertical-align: top;
    line-height: 36px;
    font-size: 24px;
    font-weight: normal;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  }

  .p-subtitle {
    margin-top: 10px;
    font-size: 13px;
    color: #000;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  }
}
</style>
