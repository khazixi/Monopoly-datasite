<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { computed, ref } from 'vue';
import { usePlayers } from '../stores/player'
import Search from '../components/Search.vue'

const players = usePlayers()
const selectedPlayer = ref(0)
const selectedProperty = ref('')
const currentMoney = computed(() => players.players[selectedPlayer.value].money)
const { data, isFetching, error } = useFetch('/api/names').get().json<{ names: string }[]>()

</script>

<template>
  <p> Current Players: {{ players.players.length }} </p>
  <input disabled v-if="isFetching || !data" />
  <Search v-else-if="data" :items="['apple', 'banana']" @selected="(n) => selectedProperty = n" />

  <!-- TODO: Add A Popover???? --->
  <input type="text">

  <!-- TODO: Add a way to simplify the UI  -->
  <article v-for="(player, idx) in players.players">
    <header>
      <h2> {{ player }} </h2>
    </header>

    <section>
      <details>
        <summary> Properties </summary>
        <ul>
          <li v-for="owned in player.owned">
            {{ owned }}
          </li>
        </ul>
      </details>
      <button @click="selectedPlayer = idx"> Select </button>

      <form v-if="selectedPlayer === idx" @submit.prevent="players.players[idx].money = currentMoney">
        <label> Money: </label>
        <input type="number" v-model="currentMoney">
        <input type="submit">
      </form>
    </section>

  </article>
</template>
