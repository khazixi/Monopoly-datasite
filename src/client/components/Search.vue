<script setup lang="ts">
import { computed, ref } from 'vue';

  const props = defineProps<{items: string[]}>()
  const emits = defineEmits<{
    (e: 'selected', val: string ): void
  }>()
  const text = ref('')
  const selected = ref('')
  const searchItems = computed<string[]>(() => {
    if (text.value === '') return []
    props.items.filter((val) => {
      if (val.toLowerCase().includes(text.value.toLowerCase())) {
        return val
      }
    })
  })
</script>

<template>
  <input text="text" placeholder="Enter property name" v-model="text">
  <ul class="list-none">
    <li v-for="searchItem in searchItems" @click="selected = searchItem">
      {{ searchItem }}
    </li>
  </ul>
</template>
