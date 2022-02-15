interface SettingTy {
  title: string,
  showSettings: boolean,
  tagsView: boolean,
  fixedHeader: boolean,
  sidebarLogo: boolean,
  errorLog: string | []
}

const setting: SettingTy = {
  // 网站标题
  title: 'Cxx博客管理系统',

  /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
  showSettings: true,

  /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
  tagsView: true,

  /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
  fixedHeader: false,

  /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
  // 打开侧边栏Logo 具体内容在layout->components->Sidebar->Logo.vue中
  sidebarLogo: true,

  /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
  errorLog: 'production'
}

export default setting
