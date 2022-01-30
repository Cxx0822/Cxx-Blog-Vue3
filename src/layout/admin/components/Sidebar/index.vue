<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" :title="logoInfo.title" :logo="logoInfo.logo"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
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
      </el-menu> -->

      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item>
          <i class="fa fa-fw fa-home"></i>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item>
          <i class="fa fa-fw fa-th"></i>
          <span>分类</span>
        </el-menu-item>

        <el-menu-item>
          <i class="fa fa-fw fa-archive"></i>
          <span>归档</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
// import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { computed, reactive } from 'vue'

const logoInfo = reactive({
  title: 'NJTECH_Cxx',
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
})

const showLogo = computed(() => true)
const isCollapse = computed(() => false)

</script>
