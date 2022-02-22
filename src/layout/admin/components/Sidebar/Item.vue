<template>
  <div class="item-div">
    <i v-if="(props.icon).includes('el-icon')" class="sub-el-icon"></i>
    <svg-icon v-else :icon-class="props.icon"></svg-icon>
    <span>{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.item-div {
  .sub-el-icon {
    color: currentColor;
  }
}

</style>
