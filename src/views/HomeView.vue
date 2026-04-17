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