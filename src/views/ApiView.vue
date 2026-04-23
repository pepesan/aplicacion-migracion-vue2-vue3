<template>
  <section>
    <h2>Componente API</h2>

    <button @click="fetchPosts" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Cargar Posts' }}
    </button>

    <p v-if="error" style="color: red">{{ error }}</p>

    <ul v-if="posts.length">
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.id }}. {{ post.title }}</strong>
        <p>{{ post.body }}</p>
      </li>
    </ul>

    <p v-else-if="!loading && fetched">No hay datos disponibles.</p>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ApiView',
  setup() {
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)
    const fetched = ref(false)

    async function fetchPosts() {
      loading.value = true
      error.value = null
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        if (!response.ok) throw new Error(`Error ${response.status}`)
        posts.value = await response.json()
        fetched.value = true
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    return { posts, loading, error, fetched, fetchPosts }
  }
}
</script>