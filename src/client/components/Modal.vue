<script setup lang="ts">
import { addListener } from 'process';
import { onMounted } from 'vue';
  const props = defineProps<{id: string}>()

  onMounted(() => {
    const dialogSelector = document.getElementById(props.id)
  })
</script>

<template>
  <dialog id="id">
    <slot/>
  </dialog>
</template>
