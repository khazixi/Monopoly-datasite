<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { generateTailwindBackground, generateTailwindForeground, getSpotName, Spot } from '../lib/util'
import { useData } from '../stores/properties';
import SpotDescriptor from './SpotDescriptor.vue';

const store = useData()
const { spotIndex, selectedSpot, isEmptySpot } = storeToRefs(store)

</script>

<template>
  <h2 v-if="isEmptySpot"> Loading... </h2>
  <article v-else class="flex flex-col rounded-lg border-black border-solid border-2 w-1/4 justify-center mx-auto">
    <header :class="generateTailwindBackground(selectedSpot)">
      <h2 :class="generateTailwindForeground(selectedSpot)" class="text-center text-2xl font-bold my-4"> {{
        getSpotName(selectedSpot) }}</h2>
    </header>
    <section>
      <SpotDescriptor :spot="selectedSpot" />
    </section>
    <footer>
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid flex-auto"
        @click="spotIndex--">
        Prev
      </button>
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid flex-auto"
        @click="spotIndex++">
        Next
      </button>
    </footer>
  </article>
</template>
