import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    sidebar: {
      // !!:转为布尔值
      opened: Cookies.get('sidebarStatus') ? !!Cookies.get('sidebarStatus') : true as boolean,
      withoutAnimation: false as boolean
    },
    device: 'desktop' as string,
    size: Cookies.get('size') || 'medium' as string
  }),

  actions: {
    toggleSideBar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSideBar(withoutAnimation:boolean) {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device:string) {
      this.device = device
    },
    setSize(size:string) {
      this.size = size
      Cookies.set('size', size)
    }
  }
})
