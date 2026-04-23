<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <nav>
      <router-link to="/">Inicio</router-link>
      |
      <router-link to="/about">Acerca de</router-link>
      |
      <router-link to="/test-composition">Composition API</router-link>
      |
      <router-link to="/api">Componente API</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Demo Vue 3 Migration'
    }
  }
}
</script>