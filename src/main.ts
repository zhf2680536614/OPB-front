import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/global/base.css'

import pinia from './store'
import router from './router'
import 'element-plus/dist/index.css';

const app =createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')