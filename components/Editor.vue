<script setup lang="ts">
import { Housable, Person } from "util/client";
import { bgBySpot } from "@/util/helpers"
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps<{ player: Person; index: number }>();
const breakpoints = useBreakpoints(breakpointsTailwind)

const mobileBreakpoint = breakpoints.greaterOrEqual('sm')
// TODO: Remove Other Events
function abbreviate(name: string, viewport: boolean) {
  if (viewport) {
    return name.slice(0, 3) + "..."
  }
  return name
}
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
  <form @submit.prevent class="border-black border-solid border-2 p-2 m-2 rounded-lg flex flex-col">
    <label> Name: </label>
    <input v-model="selected.name" class="border-black border rounded p-1" type="text"
      @input="emits('updatePlayer', selected)">
    <br>

    <!-- <details class="border border-black rounded-lg m-2" v-if="player.owned.length"> -->
      <!-- TODO: Make this a component? -->
      <table class="border" v-if="player.owned.length">
        <thead class="border-b-2 p-2 border-black border-spacing-8">
          <th class="p-2">Name</th>
          <th class="p-2" v-if="mobileBreakpoint">Color</th>
          <th class="p-2">Houses</th>
          <th class="p-2">remove</th>
        </thead>
        <tbody class="">
          <tr v-for="owned in player.owned.toSorted((a,b) => a.id-b.id)" :key="owned.id">
            <td class="px-2"> {{ abbreviate(owned.name, false) }}</td>
            <td :class="bgBySpot(owned.id)" class="px-2" v-if="mobileBreakpoint"></td>
            <td class="px-2">
              <div class="border-black border rounded inline-flex gap-4" v-if="owned.houses !== undefined">
                <button @click="handleDecrement(owned)" class="p-2"> - </button>
                <p class="inline border-x p-2 border-black"> {{ owned.houses ?? "" }} </p>
                <button @click="handleIncrement(owned)" class="p-2"> + </button>
              </div>
            </td>
            <td class="px-2">
              <button class="mx-1 bg-black text-white p-2 rounded" :class="bgBySpot(owned.id)" @click="emits('deleteSpot', owned)"> Remove </button>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- </details> -->

    <label> Money: </label>
    <input v-model="selected.money" type="number" class="border-black border rounded p-1"
      @change="emits('updatePlayer', selected)">
    <br>
    <!-- <button @click="emits('updatePlayer', selected)" class="bg-black text-white p-2 rounded-md"> Save </button> -->
    <!-- TODO: Make this work later: <button> Unselect </button> -->
  </form>
</template>
