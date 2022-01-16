import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global'
const app = createApp(App)
// or app.use(globalRegister)
globalRegister(app)
app.use(store).use(router)
app.mount('#app')
