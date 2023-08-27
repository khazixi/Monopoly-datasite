<script setup lang="ts">
import { ref } from "vue";
import useGame from "@/store/game";
import { Housable } from "util/client";
import { useObjectUrl } from "@vueuse/core";

const store = useGame();
const selectedProperty = ref<Housable>({ name: "", position: -1 });
const inactiveProperties = ref<Housable[]>([]);

const fileGen = shallowRef<File>()
const fileUrl = useObjectUrl(fileGen)

function deactivateProperty(property: Housable) {
  inactiveProperties.value.push(property);
}

function handleSubmit() {
  deactivateProperty(selectedProperty.value);
  store.addProperty(store.selected, selectedProperty.value);
  selectedProperty.value = { name: "", position: -1 };
}

// BUG: /api/save seems to get called on changes
function handleCloud() {
  if (store.id) {
    store.updateState(store.game)
    return
  } else {
    store.saveState(store.game)
    return
  }
}

function download() {
  const file = new File([JSON.stringify(store.game)], `save-${store.game.name}.json`)
  fileGen.value = file
}
</script>

<!-- TODO: Redo the entire property mechanism -->
<template>
  <section class="bg-zinc-200 h-max flex flex-col">
    <form class="bg-zinc-300 m-2 border-slate-600 border-2 p-4">
      <label>Game Name: </label>
      <input v-model="store.game.name" class="border-black border-2 border-solid rounded-lg px-2 my-4" type="text"
        placeholder="Fill in This Game">
    </form>

    <button class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1" @click="store.addNewPlayer()">
      Add Player
    </button>

    <form class="flex flex-row" @submit.prevent>
      <button class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow" @click="download">
        Save
      </button>
      <button @click="handleCloud" class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow">
        Save to Cloud
      </button>
    </form>

    <a v-if="fileGen" class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow text-center"
      :href="fileUrl">Download</a>
    <!-- TODO: Fix up this class tag -->
    <label for="upload" class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow text-center"> Upload </label>
    <input id="upload" type="file" accept=".json" class="file:hidden">


    <button v-if="selectedProperty.name !== ''" class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1"
      @click="handleSubmit()">
      Add {{ selectedProperty.name }} to {{ store.selectedPlayer.name }}
    </button>

    <Search :houses="store.owned" @selected="(n) => (selectedProperty = n)" />

    <!-- BUG: Should not render if no player is selected -->
    <section class="flex flex-col sm:flex-row">
      <Editor class="basis-2/3" :player="store.selectedPlayer" :index="store.selected"
        @update-player="(p) => store.updatePlayer(store.selected, p)"
        @delete-spot="(d) => store.removeProperty(store.selected, d)" />

      <div class="basis-1/3">
        <Viewer v-for="{ player, index } in store.unselectedPlayer" :key="player.name" :player="player" :index="index"
          @select-player="(s) => store.selected = s" @delete-player="(d) => store.removePlayer(d)" />
      </div>
    </section>
  </section>
</template>
