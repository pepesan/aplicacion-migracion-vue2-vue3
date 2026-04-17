<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script setup>
defineOptions({
  name: 'BaseButton'
})
</script>

<style scoped>
.base-button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>