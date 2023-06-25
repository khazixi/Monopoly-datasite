<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue';
import { Housable } from '../lib/storage';

const props = defineProps<{ houses: Housable[] }>()
const text = ref('')
const { data } = await useFetch('/api/names').get().json<Housable[]>()

const searchItems = computed<Housable[]>(() => {
  if (!data.value) return []
  if (text.value === '') return []

  let matched = 0

  return data.value.filter((val) => {
    if (props.houses && props.houses.findIndex((v) => v.name === val.name) !== -1) return false
    if (val.name.toLowerCase().includes(text.value.toLowerCase()) && matched < 5) {
      matched++
      return true
    }
  })
})
</script>

<template>
  <div class="px-2">
    <input class="border-black border-2 border-solid rounded-t-lg px-2 w-60" text="text" placeholder="Enter property name"
      v-model="text">
    <ul v-if="text.length" class="list-none border-2 border-solid border-black w-60 rounded-b-lg">
      <li v-for="searchItem in searchItems" @click="$emit('selected', searchItem)" class="hover:bg-gray-500">
        {{ searchItem.name }}
      </li>
    </ul>
  </div>
</template>
