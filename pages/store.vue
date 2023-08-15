<script setup lang="ts">
import { ref } from "vue";
import { usePlayers } from "@/store/player";
import { Housable } from "util/client";

const players = usePlayers();
const gameName = ref("");
const selectedProperty = ref<Housable>({ name: "", id: -1 });
const inactiveProperties = ref<Housable[]>([]);


function deactivateProperty(property: Housable) {
  inactiveProperties.value.push(property);
}

function handleSubmit() {
  deactivateProperty(selectedProperty.value);
  players.addProperty(players.selected, selectedProperty.value);
  selectedProperty.value = { name: "", id: -1 };
}

function transformGame() {
  return {
    name: gameName.value,
    players: players.players
  }
}
</script>

<!-- TODO: Redo the entire property mechanism -->
<template>
  <section class="bg-zinc-200 h-max flex flex-col">
    <form class="bg-zinc-300 m-2 border-slate-600 border-2 p-4">
      <label>Game Name: </label>
      <input v-model="gameName" class="border-black border-2 border-solid rounded-lg px-2 my-4" type="text"
        placeholder="Fill in This Game">
    </form>

    <button class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1" @click="players.addNewPlayer()">
      Add Player
    </button>

    <div class="flex flex-row">
      <button class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow"
        @click="console.log(JSON.stringify(transformGame()))">
        Download
      </button>
      <button class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow">
        Save to Cloud
      </button>
    </div>


    <button v-if="selectedProperty.name !== ''" class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1"
      @click="handleSubmit()">
      Add {{ selectedProperty.name }} to {{ players.selectedPlayer.name }}
    </button>

    <Search :houses="players.owned" @selected="(n) => (selectedProperty = n)" />

    <!-- BUG: Should not render if no player is selected -->
    <section class="flex flex-col sm:flex-row">
      <Editor class="basis-2/3" :player="players.selectedPlayer" :index="players.selected"
        @update-player="(p) => players.updatePlayer(players.selected, p)"
        @delete-spot="(d) => players.removeProperty(players.selected, d)" />

      <div class="basis-1/3">
        <Viewer v-for="{ player, index } in players.unselectedPlayer" :key="player.name" :player="player" :index="index"
          @select-player="(s) => players.selected = s" @delete-player="(d) => players.removePlayer(d)" />
      </div>
    </section>
  </section>
</template>
