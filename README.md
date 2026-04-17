## Aplicación de ejemplo para una migración de una app vuejs 2 a vuejs 3 utilizando el composition API

## Arranque inicial
```bash
npm install
npm run serve
```
Acceder a http://localhost:8080/ para ver la aplicación en funcionamiento.

## Metemos la compatibilidad con Vue 2
Cambiamos las dependencias en el package.json para incluir la compatibilidad con Vue 2:

```json
{
  "name": "vue2-migration-demo",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve"
  },
  "dependencies": {
    "vue": "^3.1.0",
    "@vue/compat": "^3.1.0",
    "vue-router": "^4.0.0",
    "vuex": "^4.0.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.8",
    "@vue/compiler-sfc": "^3.1.0"
  }
}
```
Borramos el node_modules y el package-lock.json para asegurarnos de que se instalen las nuevas dependencias correctamente:

```bash
rm -rf node_modules package-lock.json
npm install
```
Creamos el fichero main.js con el siguiente contenido para configurar Vue 3 con compatibilidad para Vue 2:

```javascript
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
  }
}
```
Cambiamos el código de main.js para crear la aplicación utilizando Vue 3 pero con compatibilidad para Vue 2:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/BaseButton.vue'

const app = createApp(App)

app.component('BaseButton', BaseButton)

app.config.globalProperties.$filters = {
  uppercase(value) {
    if (!value) return ''
    return String(value).toUpperCase()
  }
}

app.use(router)
app.use(store)

app.mount('#app')
```
Cambiamos la configuración de Vue Router para utilizar la nueva sintaxis de Vue 3:

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```
Cambiamos la configuración de Vuex para utilizar la nueva sintaxis de Vue 3:
```javascript
import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: ['Aprender Vue 2', 'Preparar migración a Vue 3']
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task)
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('ADD_TASK', task)
    }
  }
})
```
Cambiamos el código de los componentes para utilizar la nueva sintaxis de Vue 3 pero manteniendo la compatibilidad con Vue 2.
Empezamos por el componente HomeView.vue:
```vue
<template>
  <section>
    <h2>{{ subtitleUppercase }}</h2>

    <TaskForm
        v-model="newTask"
        @save="handleSave"
    />

    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
      </li>
    </ul>
  </section>
</template>

<script>
import TaskForm from '../components/TaskForm.vue'

export default {
  name: 'HomeView',
  components: {
    TaskForm
  },
  data() {
    return {
      subtitle: 'lista de tareas',
      newTask: ''
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    },
    subtitleUppercase() {
      return this.subtitle.toUpperCase()
    }
  },
  methods: {
    handleSave() {
      if (!this.newTask.trim()) return
      this.$store.dispatch('addTask', this.newTask)
      this.newTask = ''
    }
  }
}
</script>
```
