<template>
  <h1 class="h1-blog-title">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    require: true
  }
})
</script>

<style lang="scss" scoped>
.h1-blog-title {
  margin-top: 80px;

  font-size: 26px;
  text-align: center;
  word-break: break-word;
  font-weight: 400;
  background-color: #87cefa;
  border-radius: 0.3em;
  line-height: 1em;
  padding-bottom: 0.12em;
  padding-top: 0.12em;
  box-shadow: 2px 2px 7px #9fb6cd;
}
</style>
