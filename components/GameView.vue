<script setup lang="ts">
import useGame from '@/stores/game'
import { useArrayFilter } from '@vueuse/core'
import { GameRoute } from '@/server/util/cleaning';
const prop = defineProps<{ games: GameRoute[] }>()
const store = useGame()
const disabled = ref<number[]>([])
async function deleteFromCloud(id: number) {
  disabled.value.push(id)
  await $fetch(`/api/game/${id}`, {
    method: 'DELETE'
  })
}

const available = useArrayFilter(prop.games, v => !disabled.value.includes(v.id))
</script>

<template>
  <div @click="store.importGame(game)" v-for="game in available" :key="game.data.name"
    class="border-2 border-black w-1/2 flex flex-row">
    <NuxtLink to="/store" class="flex-grow">
      <h1> {{ game.data.name }}</h1>
      <h2>
        Players: {{ game.data.players.length }}
      </h2>
    </NuxtLink>
    <button @click="deleteFromCloud(game.id)" class="bg-black p-4 text-white">
      Delete
    </button>
  </div>
</template>
