<script setup lang="ts">
definePageMeta({
  middleware: 'protected'
})
const { data: games, error, pending } = await useFetch('/api/games', { method: 'GET' })
</script>

<template>
  <section class="flex flex-col mx-auto items-center p-4 gap-4">
    <h1 v-if="pending"> Loading... </h1>
    <div v-if="error" class="flex flex-col bg-red-300 border-red-800 border-2 w-1/2 my-4">
      <h1> {{ error.name }}</h1>
      <p> {{ error.message }}</p>
    </div>

    <GameView v-if="games" :games="games" />
  </section>
</template>
