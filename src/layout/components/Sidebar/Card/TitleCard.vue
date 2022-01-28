<template>
  <div class="div-title-card">
    <Title></Title>
    <NavItem></NavItem>
  </div>
</template>

<script setup lang="ts">
import Title from '../Title.vue'
import NavItem from '../NavItem.vue'

</script>

<style lang="scss" scoped>
.div-title-card {
  top: 0;
  overflow: hidden;
  padding: 0;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 6%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  border-radius: 15px 15px 15px 15px;
}
</style>
