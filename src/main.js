import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.config.globalProperties.$filters = {
  uppercase: function (value) {
    if (!value) return ''
    return String(value).toUpperCase()
  }
}

app.use(createPinia())
app.use(router)
app.mount('#app')