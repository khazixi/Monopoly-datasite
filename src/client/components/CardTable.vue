<script setup lang="ts">
import { useArrayFilter } from '@vueuse/core'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useData } from '../stores/properties';

const store = useData()
const { cards: deck } = storeToRefs(store)
const page = ref(1)
const tableSize = ref(5)


// WARNING: Math for this component may break
function nextPage() {
if (!deck.value) return
  if ((page.value) <= Math.floor(deck.value.length / tableSize.value) - 1) page.value++
}

function prevPage() {
  if (page.value - 1 < 1) return
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
  <p v-if="store.isEmptyCard">loading</p>
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
