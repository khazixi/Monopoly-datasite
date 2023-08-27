<script setup lang="ts">
import useGame from 'store/game';

definePageMeta({
  middleware: 'protected'
})
const { data: games, error } = await useFetch('/api/games', { method: 'GET' })
</script>

<template>
  <section class="flex flex-col">
    <div v-if="error" class="flex flex-col bg-red-300 border-red-800 border-2 w-1/2 mx-auto my-4">
      <h1> {{ error.name }}</h1>
      <p> {{ error.message }}</p>
    </div>

    <GameView v-if="games" :games="games" />
  </section>
</template>
