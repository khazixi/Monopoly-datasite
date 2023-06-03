<script setup lang="ts">
import { ref } from 'vue'
import { FetchBySpots, generateTailwindBackground, getDescription, getSpotName, Spot } from '../lib/util'

const currentID = ref(0)

const spots = await FetchBySpots()

function nextSlide() { currentID.value = Math.abs(currentID.value + 1) % 40 }
function prevSlide() { currentID.value = Math.abs(currentID.value - 1) % 40 }

</script>

<template>
  <!-- HACK: Spot is manually casted to Spot because I cannot break the union from FetchBySpots -->
  <h2 v-if="typeof currentID === 'string'">Error</h2>
  <article v-else class="flex flex-col rounded-lg border-black border-solid border-2 w-1/4 justify-center mx-auto">
    <header :class="'bg-' + generateTailwindBackground(spots[currentID] as Spot)">
      <h2 class="text-center text-2xl font-bold my-4">
        {{ getSpotName(spots[currentID] as Spot) }}
      </h2>
      <img alt="There should be an image here">
    </header>
    <section>
      <p>
        {{ getDescription(spots[currentID] as Spot) }}
      </p>
    </section>
    <footer class="flex flex-row grow">
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-r-2 border-white border-solid flex-auto"
        @click="prevSlide">
        Prev
      </button>
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid flex-auto"
        @click="nextSlide">
        Next
      </button>
    </footer>
  </article>
</template>
