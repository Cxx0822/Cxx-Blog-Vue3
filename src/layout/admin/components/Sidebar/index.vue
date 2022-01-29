<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar> -->
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
// import SidebarItem from './SidebarItem'
// import variables from '@/styles/variables.scss'
import { computed } from 'vue'

const showLogo = computed(() => true)
const isCollapse = computed(() => true)

</script>
