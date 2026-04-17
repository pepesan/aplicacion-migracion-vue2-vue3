<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  compatConfig: {
    INSTANCE_LISTENERS: false
  }
}
</script>

<style scoped>
.base-button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>