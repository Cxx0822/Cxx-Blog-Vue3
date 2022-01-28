<template>
  <div class="grid">
    <TitleCard></TitleCard>
    <HomeCard class="home-card"></HomeCard>
  </div>
</template>

<script setup lang="ts">
import TitleCard from '@/layout/components/Sidebar/Card/TitleCard.vue'
import HomeCard from '@/layout/components/Sidebar/Card/HomeCard.vue'
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
}
</style>
