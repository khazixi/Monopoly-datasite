<script setup lang="ts">
import { ref } from "vue";
import { usePlayers } from "@/store/player";
import { Housable } from "util/client";
import { useObjectUrl } from "@vueuse/core";

const players = usePlayers();
const gameName = ref("");
const selectedProperty = ref<Housable>({ name: "", id: -1 });
const inactiveProperties = ref<Housable[]>([]);

const fileGen = shallowRef<File>()
const fileUrl = useObjectUrl(fileGen)

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
function download() {
  const file = new File([JSON.stringify(transformGame())], `save-${gameName.value}.json`)
  fileGen.value = file
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

    <form class="flex flex-row" @submit.prevent>
      <button class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow"
        @click="download">
        Download
      </button>
      <button class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow">
        Save to Cloud
      </button>
    </form>

    <a v-if="fileGen" :href="fileUrl"> View the File Here</a>
    <!-- TODO: Fix up this class tag -->
    <input type="file" accept=".json"
      class="file:bg-slate-500 file:text-white file:p-4 file:rounded-lg file:my-2 file:mx-1 file:grow file:border-0 self-center">


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
