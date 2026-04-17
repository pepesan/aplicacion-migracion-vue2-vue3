import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/BaseButton.vue'

Vue.config.productionTip = false

Vue.component('BaseButton', BaseButton)

Vue.filter('uppercase', function (value) {
    if (!value) return ''
    return String(value).toUpperCase()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')