<template>
  <button class="base-button" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style scoped>
.base-button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>