<script setup lang="ts">
import { Drawable, Property, Railroad, Special, Utilities } from '@prisma/client';
import { useFetch } from '@vueuse/core';
import { computed, Prop, ref } from 'vue'
import { SpotSchema } from '../../lib/schema';
import { generateTailwindBackground, generateTailwindForeground, getDescription, getSpotName, getType, Spot } from '../lib/util'
import SpotDescriptor from './SpotDescriptor.vue';

const currentID = ref(0)

const url = computed(() => `/api/spot/${currentID.value}`)


function getNextID() { return Math.abs(currentID.value + 1) % 40 }
function getPrevID() { return Math.abs(currentID.value - 1) % 40 }

function nextSlide() { currentID.value = getNextID() }
function prevSlide() { currentID.value = getPrevID() }

const { data, isFetching, error } = await useFetch(url, { refetch: true }).get().json()

const spot = computed(() => SpotSchema.parse(data.value.data))
</script>

<template>
  <!-- HACK: Spot is manually casted to Spot because I cannot break the union from FetchBySpots -->
  <article class="flex flex-col rounded-lg border-black border-solid border-2 w-1/4 justify-center mx-auto">
    <header :class="[(error) ? 'bg-red' : generateTailwindBackground(spot)]">
      <h2 class="text-black" v-if="isFetching"> Loading... </h2>
      <h2 class="text-white" v-else-if="error"> Error! </h2>
      <h2 v-else :class="generateTailwindForeground(spot)" class="text-center text-2xl font-bold my-4">
        {{ getSpotName(spot) }}
      </h2>
    </header>
    <section>
      <p class="text-black" v-if="isFetching"> Loading... </p>
      <p class="text-white" v-else-if="error"> Error! </p>
      <!-- HACK: I am using properties to get around the fact that I do not know how I would get a function to render text properly-->
      <SpotDescriptor :spot="spot"/>
    </section>
    <footer class="flex flex-row grow">
      <button :class="[generateTailwindBackground(spot), generateTailwindForeground(spot)]"
        class="text-white bg-black py-4 place-content-stretch text-center border-r-2 border-white border-solid flex-auto"
        @click="prevSlide">
        Prev
      </button>
      <button :class="[generateTailwindBackground(spot), generateTailwindForeground(spot)]"
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid flex-auto"
        @click="nextSlide">
        Next
      </button>
    </footer>
  </article>
</template>
