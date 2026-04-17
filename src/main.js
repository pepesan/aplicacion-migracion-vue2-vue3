import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Ya no importamos el store de Vuex, ya que usaremos Pinia
//import store from './store'
import BaseButton from './components/BaseButton.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.component('BaseButton', BaseButton)

app.config.globalProperties.$filters = {
    uppercase(value) {
        if (!value) return ''
        return String(value).toUpperCase()
    }
}

app.use(router)
app.use(pinia)
// quitamos la carga del store de vuex
// app.use(store)

app.mount('#app')