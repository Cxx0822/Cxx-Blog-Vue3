import { defineStore } from 'pinia'
import setting from '@/settings'

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    showSettings: setting.showSettings,
    tagsView: setting.tagsView,
    fixedHeader: setting.fixedHeader,
    sidebarLogo: setting.sidebarLogo
  }),

  actions: {
    // changeSetting(data:any) {
    //   const { key, value } = data
    //   // eslint-disable-next-line no-prototype-builtins
    //   if (this.$state.hasOwnProperty(key)) {
    //     this.$state[key] = value
    //   }
    // }
  }
})

