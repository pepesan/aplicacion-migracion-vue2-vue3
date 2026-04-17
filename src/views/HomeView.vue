<template>
  <section>
    <h2>{{ subtitleUppercase }}</h2>

    <TaskForm
        v-model="newTask"
        @save="handleSave"
    />

    <ul>
      <li v-for="(task, index) in taskStore.tasks" :key="index">
        {{ task }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import { useTaskStore } from '../store/task'

// store
const taskStore = useTaskStore()

// estado local
const subtitle = ref('lista de tareas')
const newTask = ref('')

// computed
const subtitleUppercase = computed(() => subtitle.value.toUpperCase())

// acciones
function handleSave() {
  if (!newTask.value.trim()) return
  taskStore.addTask(newTask.value)
  newTask.value = ''
}
</script>