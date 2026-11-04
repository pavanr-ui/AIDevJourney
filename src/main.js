import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import './style.css'
import router from './router'
import { authReady } from './auth'

authReady.then(() => {
  createApp({ render: () => h(RouterView) }).use(router).mount('#app')
})
