<template>
  <div>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
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
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'save']
}
</script>