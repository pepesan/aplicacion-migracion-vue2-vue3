<template>
  <section>
    <h2>{{ subtitle.toUpperCase() }}</h2>

    <TaskForm
        v-model="newTask"
        @save="handleSave"
    />

    <ul>
      <li v-for="(task, index) in store.tasks" :key="index">
        {{ task }}
      </li>
    </ul>
  </section>
</template>

<script>
import { ref } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import { useTasksStore } from '../stores/tasks'

export default {
  name: 'HomeView',
  components: { TaskForm },
  setup() {
    const store = useTasksStore()
    const subtitle = ref('lista de tareas')
    const newTask = ref('')

    function handleSave() {
      if (!newTask.value.trim()) return
      store.addTask(newTask.value)
      newTask.value = ''
    }

    return { store, subtitle, newTask, handleSave }
  }
}
</script>