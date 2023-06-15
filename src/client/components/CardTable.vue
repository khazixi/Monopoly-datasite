<script setup lang="ts">
import { useArrayFilter, useFetch } from '@vueuse/core'
import { APIResponse } from '../lib/util'
import { Card } from '@prisma/client'
import { ref } from 'vue';
const { data, isFetching, error } = useFetch<Card[]>('/api/cards').get()
const deck = data.value.data
const page = ref(1)
const tableSize = ref(5)


// WARNING: Math for this component may break
function nextPage() {
  if ((page.value + 1) <= Math.floor(deck.length / tableSize.value)) page.value++
}

function prevPage() {
  if (page.value - 1 < 0) return
  page.value--
}

function tableFilter(index: number) {
  let start = (1 - page.value) * tableSize.value - 1
  let end = (page.value * tableSize.value) - 1
  return start <= index && index <= end
}

const talebleData = useArrayFilter(deck, (_, i) => tableFilter(i))
</script>

<template>
  <!-- TODO: Add an input to filter results -->
  <p v-if="isFetching">loading</p>
  <p v-else-if="error">error</p>
  <table v-else>
    <tr>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr v-for="card in talebleData">
      <td>{{ card.type }}</td>
      <td>{{ card.description }}</td>
    </tr>
  </table>

  <button @click="prevPage">Prev</button>
  <button @click="nextPage">Next</button>
</template>
