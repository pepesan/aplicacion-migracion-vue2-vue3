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
Volvemos a probar si arranca y va todo bien
```bash
npm run serve
```
Accedemos a http://localhost:8080/ para ver la aplicación en funcionamiento con Vue 3 pero con compatibilidad para Vue 2.

## Revisar los avisos de compabilidad
Revisamos la consola del navegador para ver los avisos de compatibilidad que nos indican qué partes del código aún están utilizando sintaxis o características de Vue 2 que no son compatibles con Vue 3. 
Estos avisos nos ayudarán a identificar qué partes del código debemos actualizar para aprovechar las nuevas características de Vue 3 y eliminar la compatibilidad con Vue 2.
Por ejemplo, podríamos ver un aviso como este:
```
[Vue warn]: (deprecation COMPONENT_V_MODEL) v-model usage on component has changed in Vue 3. Component that expects to work with v-model should now use the "modelValue" prop and emit the "update:modelValue" event. You can update the usage and then opt-in to Vue 3 behavior on a per-component basis with `compatConfig: { COMPONENT_V_MODEL: false }`.
  Details: https://v3-migration.vuejs.org/breaking-changes/v-model.html 
  at <TaskForm modelValue="" onUpdate:modelValue=fn onSave=fn<bound handleSave> >
```
Este aviso nos indica que el componente TaskForm está utilizando la sintaxis de v-model de Vue 2, y que debemos actualizarlo para utilizar la nueva sintaxis de Vue 3.
O este otro:
```
[Vue warn]: (deprecation INSTANCE_LISTENERS) vm.$listeners has been removed. In Vue 3, parent v-on listeners are included in vm.$attrs and it is no longer necessary to separately use v-on="$listeners" if you are already using v-bind="$attrs". (Note: the Vue 3 behavior only applies if this compat config is disabled)
  Details: https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html 
  at <BaseButton onClick=fn > 
  at <TaskForm onSave=fn<bound handleSave> value="" onModelCompat:input=fn > 
  at <HomeView onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
```
Este aviso nos indica que el componente BaseButton está utilizando la sintaxis de $listeners de Vue 2, y que debemos actualizarlo para utilizar la nueva sintaxis de Vue 3.
## Actualizar el código para Vue 3
Empezamos por actualizar el componente TaskForm.vue para utilizar la nueva sintaxis de v-model de Vue 3:
```vue
<template>
  <div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Nueva tarea"
    />

    <BaseButton @click="$emit('save')">
      Añadir
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'save']
}
</script>
```
Antes teníamos:

props.value
this.$emit('input', ...)

Ahora debemos cambiarlo a:

props.modelValue
this.$emit('update:modelValue', ...)

Hacemos lo propio con el componente BaseButton.vue para eliminar la sintaxis de $listeners:
```vue
<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style scoped>
.base-button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```
Antes teníamos:
<button class="base-button" v-on="$listeners">
Ahora simplemente eliminamos el v-on="$listeners" ya que en Vue 3 los eventos se manejan automáticamente a través de $attrs.
Volvemos a probar si arranca y va todo bien

## Quitando la compatibilidad con Vue 2
Ahora podemos empezar a probar a eliminar la compatibilidad con Vue 2 para aprovechar las nuevas características de Vue 3.
Empezando por el componente TaskForm.vue, podemos eliminar la compatibilidad con Vue 2 :
```vue
<template>
  <div>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Nueva tarea"
    />

    <BaseButton @click="$emit('save')">
      Añadir
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  compatConfig: {
    COMPONENT_V_MODEL: false
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'save']
}
</script>
```
Al establecer `COMPONENT_V_MODEL: false` en la configuración de compatibilidad del componente, estamos indicando que este componente
ya no es compatible con la sintaxis de v-model de Vue 2, y que solo utilizará la nueva sintaxis de Vue 3. 
Debería desaparecer el aviso de compatibilidad relacionado con v-model en la consola del navegador.

Hacemos lo propio con el componente BaseButton.vue para eliminar la compatibilidad con Vue 2:
```vue
<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  compatConfig: {
    INSTANCE_LISTENERS: false
  }
}
</script>

<style scoped>
.base-button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```
Al establecer `INSTANCE_LISTENERS: false` en la configuración de compatibilidad del componente,
estamos indicando que este componente ya no es compatible con la sintaxis de $listeners de Vue 2, y que solo utilizará la nueva sintaxis de Vue 3 para manejar los eventos.


Quitamos la compatibilidad con Vue 2 en el vue.config.js eliminando la configuración de compatibilidad global:
```javascript
// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        // quitamos la configuración de compatibilidad global para Vue 2
        // config.resolve.alias.set('vue', '@vue/compat')
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                return {
                    ...options,
                    // comentamos la configuración de compatibilidad de compilación para Vue 2
                    /* compilerOptions: {
                        compatConfig: {
                            MODE: 2
                        }
                    }*/
                }
            })
    }
}
```
Quitamos el @vue/compat de las dependencias en el package.json ya que ya no necesitamos la compatibilidad con Vue 2:
```json
{
  "name": "vue2-migration-demo",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve"
  },
  "dependencies": {
    "vue": "^3.1.0",
    "vue-router": "^4.0.0",
    "vuex": "^4.0.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.8",
    "@vue/compiler-sfc": "^3.1.0"
  }
}
```
ejecutamos npm install para actualizar las dependencias y eliminar @vue/compat:
```bash
npm install
```
Volvemos a probar si arranca y va todo bien:
```bash
npm run serve
```
Accedemos a http://localhost:8080/ para ver la aplicación en funcionamiento con Vue 3 sin compatibilidad para Vue 2.
Si al quitar @vue/compat algo rompe, significa que todavía dependías de comportamiento de Vue 2.

## Metemos nuevos componente y características de Vue 3
Ahora que ya hemos eliminado la compatibilidad con Vue 2, podemos empezar a aprovechar las nuevas características de Vue 3, como el Composition API

Metemos una nueva vista para mostrar el detalle de una tarea utilizando el Composition API src/views/NewTaskView.vue:
```vue
<template>
  <section>
    <h2>Nuevo componente Vue 3</h2>

    <input v-model="task" placeholder="Nueva tarea" />
    <button @click="saveTask">Añadir</button>

    <p v-if="lastSaved">
      Última tarea guardada: {{ lastSaved }}
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const task = ref('')
const lastSaved = ref('')

function saveTask() {
  if (!task.value.trim()) return
  lastSaved.value = task.value
  task.value = ''
}
</script>
```
Añadimos una nueva ruta para esta vista en src/router/index.js:
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NewTaskView from '../views/NewTaskView.vue'

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
    },
    {
        path: '/new-task',
        name: 'new-task',
        component: NewTaskView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
```
Modificamos el componente App.vue para añadir un enlace a la nueva vista:
```vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <nav>
      <router-link to="/">Inicio</router-link>
      |
      <router-link to="/about">Acerca de</router-link>
      |
      <router-link to="/new-task">Nuevo componente</router-link>
    </nav>

    <router-view />
  </div>
</template>
```

Y ya deberíamos poder acceder a http://localhost:8080/new-task para ver la nueva vista utilizando el Composition API de Vue 3.

## Migración a Pinia
Podemos aprovechar la migración para cambiar de Vuex a Pinia, que es la nueva librería de gestión de estado recomendada para Vue 3.
Instalamos Pinia como dependencia:
```bash
npm install pinia
```
Creamos una nueva tienda utilizando Pinia en src/store/task.js:
```javascript
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: ['Aprender Vue 2', 'Preparar migración a Vue 3']
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task)
        }
    }
})
```
Modificamos el main.js para utilizar Pinia en lugar de Vuex:
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/BaseButton.vue'
// importamos Pinia
import { createPinia } from 'pinia'
// creamos la instancia de Pinia
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
// cargamos el store de Pinia
app.use(pinia)
app.use(store)

app.mount('#app')
```

Modificamos el componente HomeView.vue para utilizar la nueva tienda de Pinia en lugar de Vuex:
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
import { useTaskStore } from '../store/task'

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
    taskStore() {
      return useTaskStore()
    },
    tasks() {
      return this.taskStore.tasks
    },
    subtitleUppercase() {
      return this.subtitle.toUpperCase()
    }
  },
  methods: {
    handleSave() {
      if (!this.newTask.trim()) return
      this.taskStore.addTask(this.newTask)
      this.newTask = ''
    }
  }
}
</script>
```
En este código, hemos importado la función `useTaskStore` desde nuestra tienda de Pinia y la hemos utilizado para acceder al estado de las tareas y a la acción para agregar nuevas tareas
Volvemos a probar si arranca y va todo bien:
```bash
npm run serve
```
Accedemos a http://localhost:8080/ para ver la aplicación en funcionamiento con Vue 3 y Pinia.

## Borramos el código de Vuex y las dependencias de Vuex ya que ya no lo necesitamos:
```bash
npm uninstall vuex
rm -rf src/store/index.js
```

Modificamos el main.js para eliminar la referencia a Vuex:
```javascript
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
import { useTaskStore } from '../store/task'

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
    taskStore() {
      return useTaskStore()
    },
    tasks() {
      return this.taskStore.tasks
    },
    subtitleUppercase() {
      return this.subtitle.toUpperCase()
    }
  },
  methods: {
    handleSave() {
      if (!this.newTask.trim()) return
      this.taskStore.addTask(this.newTask)
      this.newTask = ''
    }
  }
}
</script>
```
Volvemos a probar si arranca y va todo bien:
```bash
npm run serve
```
Accedemos a http://localhost:8080/ para ver la aplicación en funcionamiento con Vue 3 y Pinia sin ninguna referencia a Vuex.










