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