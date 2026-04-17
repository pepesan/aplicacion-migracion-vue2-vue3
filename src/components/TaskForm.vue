<template>
  <div>
    <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="Nueva tarea"
    />

    <BaseButton @click="$emit('save')">
      Añadir
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>