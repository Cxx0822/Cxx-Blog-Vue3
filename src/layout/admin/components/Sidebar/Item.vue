<template>
  <div class="item-div">
    <i :class="props.icon" class="sub-el-icon">
      <span style="margin-left: 10px;">{{ props.title }}</span>
    </i>
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
  i {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sub-el-icon {
    color: currentColor;
  }
}

</style>
