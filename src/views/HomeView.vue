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