<template>
  <div class="blog-siderbar">
    <TitleCard></TitleCard>
    <HomeCard class="home-card"></HomeCard>
  </div>
</template>

<script setup lang="ts">
import TitleCard from '@/layout/blog/components/Sidebar/Card/TitleCard.vue'
import HomeCard from '@/layout/blog/components/Sidebar/Card/HomeCard.vue'
</script>

<style lang="scss" scoped>
.blog-siderbar {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;

  width: 250px;
  margin-top: -10px;
}
</style>
