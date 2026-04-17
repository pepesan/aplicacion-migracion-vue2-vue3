<template>
  <div>
    <input
        :value="modelValue"
        @input="handleInput"
        placeholder="Nueva tarea"
    />

    <BaseButton @click="emit('save')">
      Añadir
    </BaseButton>
  </div>
</template>

<script setup>
defineOptions({
  name: 'TaskForm'
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>