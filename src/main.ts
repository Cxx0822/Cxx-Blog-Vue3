import { createApp } from 'vue'

import App from './App.vue'
// 引入路由
import router from './router'
// 引入Vuex
import store from './store'

// 引入element-ui组件
// 版本：1.2.0-beta.2  其他版本暂时有问题
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
