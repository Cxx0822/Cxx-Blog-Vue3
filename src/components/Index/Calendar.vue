<template>
  <!--日历-->
  <div class="blog-calendar">
    <el-calendar v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>

<style lang="less">
.blog-calendar{
  .el-calendar-day {
    height: 30px;
    font-size: 10px;
  }

  .el-calendar__header {
    height: 40px;
    font-size: 10px;
    padding: 10px 10px 10px 10px;
  }

  .el-calendar__body {
    padding: 10px 10px 10px 10px;
    font-size: 10px;
  }

  .el-calendar__title {
    padding: 5px 5px 5px 5px;
  }

  .el-button--plain.el-button--mini {
    padding: 8px 8px 8px 8px;
    max-height: 26px;
  }

  .el-calendar__button-group {
    height: 30px;
    margin-top: 6px;
  }
}
</style>

<style lang="less" scoped>
.blog-calendar {
  margin-top: 30px;
  width: 250px;
}
</style>
