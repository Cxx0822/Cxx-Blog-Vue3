<template>
  <div class="card">
    <p style="margin-top: 0px;">网站公告</p>
    <el-divider></el-divider>
    <p style="margin-top: 0px;">{{ welcome }}</p>
    <div>
      <p class="p-motto">{{ motto.motto1 }}</p>
      <p class="p-motto2">{{ motto.motto2 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const welcome = ref("Welcome to Cxx's Blog")

const motto = reactive({
  motto1: '我们一日日度过的所谓的日常，',
  motto2: '实际上可能是接连不断的奇迹。'
})
</script>

<style lang="less" scoped>
.card {
  width: 280px;
  height: 300px;
  padding: 20px 0px 0px 0px;
  background-color: white;
  text-align: center;

  .p-motto {
    margin-left: 20px;
    margin-top: 60px;
    margin-bottom: 0px;
    font-size: 16px;
    font-family: 宋体;
    font-weight: bold;
  }

  .p-motto2 {
    margin-left: 20px;
    margin-top: 5px;
    font-size: 16px;
    font-family: 宋体;
    font-weight: bold;
  }
}

.card:hover {
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 10px 10px;
}
</style>
