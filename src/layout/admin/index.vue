<template>
  <!-- 全局布局组件 -->
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边栏组件 -->
    <Sidebar class="sidebar-container" />
    <!-- 主体区域 -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 导航栏组件 -->
        <navbar />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <!-- app main -->
      <app-main />
      <!-- 右侧设置栏组件 -->
      <!-- <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
      <!-- 状态栏 -->
      <!-- <div class="fixed-footer">
        <footerbar />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
// import Settings from './components/Settings/index.vue'
import Sidebar from './components/Sidebar/index.vue'
// import TagsView from './components/TagsView/index.vue'

import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'

const app = useAppStore()
const settings = useSettingsStore()

const device = computed(() => app.device)
const sidebar = computed(() => app.sidebar)
const needTagsView = computed(() => settings.tagsView)
const fixedHeader = computed(() => settings.fixedHeader)
const classObj = computed(() => {
  // 控制侧边栏的显示状态
  return {
    hideSidebar: !app.sidebar.opened,
    openSidebar: app.sidebar.opened,
    withoutAnimation: app.sidebar.withoutAnimation,
    mobile: app.device === 'mobile'
  }
})

const handleClickOutside = () => {
  app.closeSideBar(false)
}

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
