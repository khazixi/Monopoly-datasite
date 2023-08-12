<script setup lang="ts">
import { Housable, Person } from "util/client";
import { bgBySpot } from "@/util/helpers"

const props = defineProps<{ player: Person; index: number }>();
// TODO: Remove Other Events
const emits = defineEmits<{
  updatePlayer: [player: Person]
  deleteSpot: [o: Housable]
}>();

const selected = ref<Person>({ name: '', money: 1500, owned: [] })
watch(toRef(props, "player"), (p) => {
  selected.value = p
});

function handleIncrement(owned: Housable) {
  if (owned.houses === undefined) return;
  if (owned.houses < 5) {
    owned.houses++;
  }
}

function handleDecrement(owned: Housable) {
  if (owned.houses === undefined) return;
  if (owned.houses > 0) {
    owned.houses--;
  }
}
</script>

<template>
  <form @submit.prevent class="border-black border-solid border-2 p-2 m-2 rounded-lg">
    <label> Name: </label>
    <input v-model="selected.name" class="border-black border rounded p-1" type="text"
      @input="emits('updatePlayer', selected)">

    <details class="border border-black rounded-lg p-2 m-2" v-if="player.owned.length">
      <!-- TODO: Make this a component? -->
      <table class="border">
        <thead class="border-b-2 p-2 border-black border-spacing-8">
          <th class="p-2">Name</th>
          <th class="p-2">Color</th>
          <th class="p-2">Houses</th>
          <th class="p-2">remove</th>
        </thead>
        <tbody class="">
          <tr v-for="owned in player.owned.toSorted((a,b) => a.id-b.id)" :key="owned.id">
            <td class="px-2"> {{ owned.name }}</td>
            <td :class="bgBySpot(owned)" class="px-2"></td>
            <td class="px-2">
              <div class="border-black border rounded inline-flex gap-4" v-if="owned.houses !== undefined">
                <button @click="handleDecrement(owned)" class="p-2"> - </button>
                <p class="inline border-x p-2 border-black"> {{ owned.houses ?? "" }} </p>
                <button @click="handleIncrement(owned)" class="p-2"> + </button>
              </div>
            </td>
            <td class="px-2">
              <button class="mx-1 bg-black text-white p-2 rounded" @click="emits('deleteSpot', owned)"> Remove </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div v-for="owned in player.owned" :key="owned.name"> -->
      <!--   <p class="inline mx-1"> {{ owned.name }}</p> -->
      <!--   <button @click="handleIncrement(owned)" class="border-black border rounded p-2 inline"> + </button> -->
      <!--   <p class="inline mx-1"> {{ owned.houses }}</p> -->
      <!--   <button @click="handleDecrement(owned)" class="border-black border rounded p-2 inline"> - </button> -->
      <!--   <button class="mx-1 bg-black text-white p-2" @click="emits('deleteSpot', owned)"> Remove </button> -->
      <!-- </div> -->
    </details>

    <label> Money: </label>
    <input v-model="selected.money" type="number" class="border-black border rounded p-1"
      @change="emits('updatePlayer', selected)">
    <br>
    <!-- <button @click="emits('updatePlayer', selected)" class="bg-black text-white p-2 rounded-md"> Save </button> -->
    <!-- TODO: Make this work later: <button> Unselect </button> -->
  </form>
</template>
