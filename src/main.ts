import { createApp } from 'vue'

import App from './App.vue'
// 引入路由
import router from './router'
// 引入Vuex
import store from './store'
// 引入axios
import VueAxios from 'vue-axios'
import axios from 'axios'

// 引入element-ui组件
// 版本：1.2.0-beta.2  其他版本暂时有问题
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// axios.defaults.baseURL = 'https://api.skymo.top/'
axios.defaults.baseURL = 'http://127.0.0.1:8080/'

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).use(VueAxios, axios).mount('#app')

// provide 'axios'
// 参考官方文档：https://github.com/imcvampire/vue-axios
app.provide('axios', app.config.globalProperties.axios)
