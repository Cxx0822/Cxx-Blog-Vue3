import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
import '@/permission'
// 引入axios
import VueAxios from 'vue-axios'
import axios from 'axios'
// 引入element-ui组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn' // 中文
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文

// 引入fortawesome
import '@/assets/fontawesome/css/all.css'

// 引入mavonEditor 目前vue3为beta版
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入svg
import svgIcon from '@/icons/index.vue'
import '@/icons/index'

// import MdEditorV3 from 'md-editor-v3'
// import 'md-editor-v3/lib/style.css'

// 创建Vue3实例
const app = createApp(App)
// 注册svg组件
app.component('svg-icon', svgIcon)
// 使用路由
app.use(router)
// 使用Pinia 需要ts 4.5以上
app.use(createPinia())
// 使用axios
app.use(VueAxios, axios)
// 使用Element UI Plus
app.use(ElementPlus, { locale })
// 使用mavonEditor
app.use(mavonEditor)
// 挂载到根组件上
app.mount('#app')

// provide 'axios'
// 参考官方文档：https://github.com/imcvampire/vue-axios
app.provide('axios', app.config.globalProperties.axios)
