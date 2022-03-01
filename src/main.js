import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
import XtxUI from '@/components'
import directive from '@/directive'

createApp(App).use(store).use(router).use(directive).use(XtxUI).mount('#app')
