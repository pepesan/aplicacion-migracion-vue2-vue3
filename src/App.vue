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

<script setup>
import { ref } from 'vue'

const title = ref('Demo Vue 3')
</script>