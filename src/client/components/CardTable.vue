<script setup lang="ts">
import { useArrayFilter, useFetch } from '@vueuse/core'
import { Card } from '@prisma/client'
import { ref } from 'vue';
const { data, isFetching, error } = await useFetch('/api/cards').get().json<Card[]>()
const deck = data.value
const page = ref(1)
const tableSize = ref(5)


// WARNING: Math for this component may break
function nextPage() {
if (!deck) return
  if ((page.value) <= Math.floor(deck.length / tableSize.value)) page.value++
}

function prevPage() {
  if (page.value - 1 < 0) return
  page.value--
}

function tableFilter(index: number) {
  let start = ((page.value - 1) * tableSize.value)
  let end = (page.value * tableSize.value) - 1
  console.log(`start: ${start}, end: ${end}`)
  return start <= index && index <= end
}

const talebleData = useArrayFilter(deck, (_, i) => {
  return tableFilter(i)
})
</script>

<template>
  <!-- TODO: Add an input to filter results -->
  <p v-if="isFetching">loading</p>
  <p v-else-if="error">error</p>
  <section v-else>
    <table class="border-solid border-black border-2">
      <tr>
        <th>Type</th>
        <th>Description</th>
      </tr>
      <tr v-for="(card, index) in talebleData" :class="[index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-400']">
        <td>{{ card.type }}</td>
        <td>{{ card.description }}</td>
      </tr>
    </table>

    <button @click="prevPage">Prev</button>
    <button @click="nextPage">Next</button>
  </section>
</template>
