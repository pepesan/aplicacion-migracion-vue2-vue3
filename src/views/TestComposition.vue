<template>
  <div>
    <h2>Componente con Composition API</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="decrement">Decrementar</button>
    <p>Texto reactivo: {{ reactiveText }}</p>
    <input v-model="reactiveText" placeholder="Escribe algo" />
    <p>Texto computado (mayúsculas): {{ computedText }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos reactivos
const count = ref(0)
const reactiveText = ref('')

// Funciones
const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

// Propiedad computada
const computedText = computed(() => {
  return reactiveText.value.toUpperCase()
})
</script>

<style scoped>
div {
  padding: 20px;
}
button {
  margin: 5px;
  padding: 8px 12px;
}
input {
  padding: 8px;
  margin: 10px 0;
}
</style>