<template>
  <div id="app">
    <h1>{{ title }}</h1>

    <nav>
      <router-link to="/">Inicio</router-link>
      |
      <router-link to="/about">Acerca de</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Demo Vue 2.7'
    }
  }
}
</script>