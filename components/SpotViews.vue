<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { bgBySpot, getName } from '@/util/helpers'
import { useData } from '@/stores/properties';

const store = useData()
const { spotIndex, selectedSpot, isEmptySpot } = storeToRefs(store)

</script>

<template>
  <h2 v-if="isEmptySpot"> Loading... </h2>
  <article v-else class="flex flex-col rounded-lg border-black border-solid border-2 justify-center mx-auto w-[296px]">
    <header class="p-4 rounded-t-md"
      :class="bgBySpot(selectedSpot.id)">
      <h2 class="text-center text-2xl text-zinc-100 font-bold my-4">
        {{ getName(selectedSpot) }}
      </h2>
    </header>
    <section class="px-4">
      <details class="m-4">
        <summary> Info </summary>
        <SpotDescriptor :spot="selectedSpot" />
      </details>
    </section>
    <footer class="flex flex-row">
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-r-2 border-white border-solid grow rounded-bl-md"
        :class="bgBySpot(selectedSpot.id)"
        @click="spotIndex--">
        Prev
      </button>
      <button
        class="text-white bg-black py-4 place-content-stretch text-center border-l-2 border-white border-solid grow rounded-br-md"
        :class="bgBySpot(selectedSpot.id)"
        @click="spotIndex++">
        Next
      </button>
    </footer>
  </article>
</template>
