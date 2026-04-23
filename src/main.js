import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { storeOptions, createStoreInstance } from './store'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.config.globalProperties.$filters = {
  uppercase: function (value) {
    if (!value) return ''
    return String(value).toUpperCase()
  }
}

const store = createStoreInstance(storeOptions)

app.use(router)
app.use(store)
app.mount('#app')