<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
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
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

// import { Menu, Edit, Files, Opportunity, Comment } from '@element-plus/icons'

const router = useRouter()
const currentRoute = router.currentRoute.value

const settingsStore = useSettingsStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => {
  const { meta, path } = currentRoute
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
const showLogo = computed(() => settingsStore.sidebarLogo)
const isCollapse = computed(() => !appStore.sidebar.opened)
const permission_routes = computed(() => permissionStore.routes)
</script>

<style lang="scss" scoped>

</style>
