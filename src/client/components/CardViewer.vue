<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue'
import { generateTailwindBackground, generateTailwindForeground, getSpotName, Spot } from '../lib/util'
import SpotDescriptor from './SpotDescriptor.vue';

const currentID = ref(0)

const url = computed(() => `/api/spot/${currentID.value}`)

function getNextID() { return Math.abs(currentID.value + 1) % 40 }
function getPrevID() { return Math.abs(currentID.value - 1) % 40 }

function nextSlide() { currentID.value = getNextID() }
function prevSlide() { currentID.value = getPrevID() }

const { data, isFetching, error } = await useFetch<Spot>(url, { refetch: true }).get().json<Spot>()

// HACK: This is Non-Nullable because if spot is null, the useFetch will return an error
</script>

<template>
  <article class="flex flex-col rounded-lg border-black border-solid border-2 w-1/4 justify-center mx-auto">
    <header :class="[(error) ? 'bg-red' : generateTailwindBackground(data)]">
      <h2 class="text-black" v-if="isFetching"> Loading... </h2>
      <h2 class="text-white" v-else-if="error || !data"> Error! </h2>
      <h2 v-else :class="generateTailwindForeground(data)" class="text-center text-2xl font-bold my-4">
        {{ getSpotName(data) }}
      </h2>
    </header>
    <section>
      <p class="text-black" v-if="isFetching"> Loading... </p>
      <p class="text-white" v-else-if="error || !data"> Error! </p>
      <!-- HACK: I am using properties to get around the fact that I do not know how I would get a function to render text properly-->
      <SpotDescriptor v-else :spot="data" />
    </section>
    <footer class="flex flex-row grow">
      <button :class="[generateTailwindBackground(data), generateTailwindForeground(data)]"
        class="text-white bg-black py-4 place-content-stretch text-center border-r-2 border-white border-solid flex-auto"
        @click="prevSlide">
        Prev
      </button>
      <button :class="[generateTailwindBackground(data), generateTailwindForeground(data)]"
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid flex-auto"
        @click="nextSlide">
        Next
      </button>
    </footer>
  </article>
</template>
