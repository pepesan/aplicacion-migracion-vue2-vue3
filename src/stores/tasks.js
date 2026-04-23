import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(['Aprender Vue 2', 'Preparar migración a Vue 3'])

  function addTask(task) {
    tasks.value.push(task)
  }

  return { tasks, addTask }
})