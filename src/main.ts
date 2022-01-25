import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store, { setupStore } from './store'
import { globalRegister } from './global'
import 'normalize.css'
import '@/assets/css/index.less'
import '../mock'
const app = createApp(App)

// or app.use(globalRegister)

globalRegister(app)
setupStore()
app.use(store).use(router)
app.mount('#app')
