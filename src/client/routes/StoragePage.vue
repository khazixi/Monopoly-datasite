<script setup lang="ts">
import { ref } from 'vue';
import { usePlayers } from '../stores/player'
import { Housable } from '../lib/storage';
import Search from '../components/Search.vue'

const players = usePlayers()

const selectedPlayer = ref(0)
const selectedProperty = ref<Housable>({ name: '' })
const inactiveProperties = ref<Housable[]>([])

function deactivateProperty(property: Housable) {
  inactiveProperties.value.push(property)
}

function houseIncrease(idx: number) {
  if (idx <= 5) return 5
  return idx++
}

function houseDecrease(idx: number) {
  if (idx <= 0) return 0
  return idx--
}
</script>

<!-- TODO: Redo the entire property mechanism -->
<template>
  <form>
    <label>Game Name: </label>
    <input class="border-black border-2 border-solid rounded-lg px-2 my-4" type="text" placeholder="Fill in This Game">
  </form>
  <p> Selected Player: <b> {{ players.players[selectedPlayer].name }} </b></p>
  <p> Selected Property: <b> {{ selectedProperty.name }}</b></p>

  <button class="bg-black text-white p-1 rounded-lg my-2 mx-1" v-if="selectedProperty.name !== ''"
    @click="deactivateProperty(selectedProperty); players.addProperty(selectedPlayer, selectedProperty); selectedProperty = { name: '' }">
    Add Property to
    {{ players.players[selectedPlayer].name }} </button>
  <br>

  <button class="bg-black text-white p-1 rounded-lg my-2 mx-1" @click="players.addNewPlayer()">
    Add Player
  </button>

  <Search @selected="(n) => selectedProperty = n" :houses="players.owned" />

  <!-- TODO: Add a way to simplify the UI  -->
  <article v-for="(player, idx) in players.players" class="border-2 border-solid border-black p-4 my-4">
    <header>
      <form @submit.prevent>
        <input class="border-black border-2 border-solid rounded-lg px-2 my-4" type="text" v-model="player.name">
      </form>
    </header>

    <section>
      <details class="border-black border-solid border-2 py-2">
        <summary> Properties </summary>
        <ul>
          <li v-for="owned in player.owned" class="px-2">
            <h2 class="inline"> {{ owned.name }}: </h2>
            <div v-if="owned.houses !== undefined" class="inline">
              <button @click="(owned.houses > 0) ? --owned.houses : owned.houses"
                class="inline mx-2 border-black border-2 border-solid px-2 rounded-lg">-</button>
              <p class="inline"> {{ owned.houses }}</p>
              <button @click="(owned.houses < 5) ? ++owned.houses : owned.houses"
                class="inline mx-2 border-black border-2 border-solid px-2 rounded-lg">+</button>
            </div>
          </li>
        </ul>
      </details>
      <button class="bg-black text-white p-1 rounded-lg my-2" @click="selectedPlayer = idx"> Select </button>

      <form v-if="selectedPlayer === idx" @submit.prevent>
        <label> Money: </label>
        <input class="border-black border-2 border-solid rounded-lg px-2" type="number" v-model="player.money">
        <br>
        <!-- <button class="border-2 border-solid border-black py-1 px-2 my-2 rounded-lg" type="submit">Save Values</button> -->
      </form>
    </section>

    <button class="bg-black text-white p-1 rounded-lg my-2 mx-1" @click="players.removePlayer(idx)"> Remove Player
    </button>

  </article>
</template>
