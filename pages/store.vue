<script setup lang="ts">
import { ref } from "vue";
import useGame from "@/stores/game";
import { Housable } from "@/util/client";

const store = useGame();
const selectedProperty = ref<Housable>({ name: "", position: -1 });
const inactiveProperties = ref<Housable[]>([]);

function deactivateProperty(property: Housable) {
  inactiveProperties.value.push(property);
}

function handleSubmit() {
  deactivateProperty(selectedProperty.value);
  store.addProperty(store.selected, selectedProperty.value);
  selectedProperty.value = { name: "", position: -1 };
}

function handleCloud() {
  if (store.id) {
    store.updateState(store.game)
  } else {
    store.saveState(store.game)
  }
}

function download() {
  const file = new File([JSON.stringify(store.game)], `save-${store.game.name}.json`)
  window.open(URL.createObjectURL(file))

}
</script>

<!-- TODO: Redo the entire property mechanism -->
<template>
  <section class="bg-zinc-200 h-max flex flex-col">
    <div class="m-2 p-4 text-center">
      <label class="text-3xl"> Game Name: </label>
      <input
        v-model="store.game.name"
        class="border-black border-2 border-solid rounded-lg p-2 bg-slate-200 my-4"
        type="text"
        placeholder="Fill in This Game"
      >
    </div>

    <button
      class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1"
      @click="store.addNewPlayer()"
    >
      Add Player
    </button>

    <form
      class="flex flex-row"
      @submit.prevent
    >
      <button
        class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow"
        @click="download"
      >
        Download
      </button>
      <!-- <a -->
      <!--   v-if="fileGen" -->
      <!--   class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow text-center" -->
      <!--   :href="fileUrl" -->
      <!-- >Download</a> -->
      <button
        class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow"
        @click="handleCloud"
      >
        Save to Cloud
      </button>
      <label
        for="upload"
        class="bg-slate-500 text-white p-4 rounded-lg my-2 mx-1 grow text-center"
      > Upload </label>
      <input
        id="upload"
        type="file"
        accept=".json"
        class="file:hidden hidden"
      >
    </form>



    <button
      v-if="selectedProperty.name !== ''"
      class="bg-slate-700 text-white p-4 rounded-lg my-2 mx-1"
      @click="handleSubmit()"
    >
      Add {{ selectedProperty.name }} to {{ store.selectedPlayer.name }}
    </button>

    <Search
      :houses="store.owned"
      @selected="(n) => (selectedProperty = n)"
    />

    <section class="flex flex-col sm:flex-row">
      <Editor
        class="basis-2/3"
        :player="store.selectedPlayer"
        :index="store.selected"
        @update-player="(p) => store.updatePlayer(store.selected, p)"
        @delete-spot="(d) => store.removeProperty(store.selected, d)"
      />

      <div class="basis-1/3">
        <Viewer
          v-for="{ player, index } in store.unselectedPlayer"
          :key="player.name"
          :player="player"
          :index="index"
          @select-player="(s) => store.selected = s"
          @delete-player="(d) => store.removePlayer(d)"
        />
      </div>
    </section>
  </section>
</template>
