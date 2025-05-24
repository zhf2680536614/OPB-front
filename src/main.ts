import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/global/base.css'

import pinia from './store'
import router from './router/index'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VLazyImage from 'v-lazy-image'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('v-lazy-image', VLazyImage)
app.use(pinia)
app.use(router)
app.mount('#app')