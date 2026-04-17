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