<script setup lang="ts">
import useGame from '@/store/game'
import { GameRoute } from 'server/util/cleaning';
const prop = defineProps<{ games: GameRoute[] }>()
const store = useGame()
</script>

<template>
  <ul>
    <li @click="store.importGame(game)" v-for="game in prop.games" :key="game.data.name" class="flex flex-row">
      <NuxtLink to="/store">
        <h1> {{ game.data.name }}</h1>
        <h2>
          Players: {{ game.data.players.length }}
        </h2>
      </NuxtLink>
    </li>
  </ul>
</template>
