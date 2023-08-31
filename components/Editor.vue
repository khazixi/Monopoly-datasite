<script setup lang="ts">
import { Housable, Person } from "@/util/client";
import { bgBySpot } from "@/util/helpers"
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const props = defineProps<{ player: Person; index: number }>();
const breakpoints = useBreakpoints(breakpointsTailwind)

const mobileBreakpoint = breakpoints.greaterOrEqual('sm')
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

const selected = ref<Person>(props.player)
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
  <form
    class="border-black border-solid border-2 p-2 m-2 rounded-lg flex flex-col"
    @submit.prevent
  >
    <label> Name: </label>
    <input
      v-model="selected.name"
      placeholder="fill in this name"
      class="border-black border rounded p-1"
      type="text"
      @input="emits('updatePlayer', selected)"
    >
    <br>

    <!-- <details class="border border-black rounded-lg m-2" v-if="player.owned.length"> -->
    <!-- TODO: Make this a component? -->
    <table
      v-if="player.owned.length"
      class="border"
    >
      <thead class="border-b-2 p-2 border-black border-spacing-8">
        <th class="p-2">
          Name
        </th>
        <th
          v-if="mobileBreakpoint"
          class="p-2"
        >
          Color
        </th>
        <th class="p-2">
          Houses
        </th>
        <th class="p-2">
          remove
        </th>
      </thead>
      <tbody class="">
        <tr
          v-for="owned in player.owned"
          :key="owned.position"
        >
          <td class="px-2 text-center">
            {{ abbreviate(owned.name, false) }}
          </td>
          <td
            v-if="mobileBreakpoint"
            :class="bgBySpot(owned.position)"
            class="px-2"
          />
          <td class="px-2 text-center">
            <div
              v-if="owned.houses !== undefined"
              class="border-black border rounded inline-flex gap-4"
            >
              <button
                class="p-2"
                @click="handleDecrement(owned)"
              >
                -
              </button>
              <p class="inline border-x p-2 border-black">
                {{ owned.houses ?? "" }}
              </p>
              <button
                class="p-2"
                @click="handleIncrement(owned)"
              >
                +
              </button>
            </div>
          </td>
          <td class="px-2 text-center">
            <button
              class="mx-1 bg-black text-white p-2 rounded"
              :class="bgBySpot(owned.position)"
              @click="emits('deleteSpot', owned)"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- </details> -->

    <label> Money: </label>
    <input
      v-model="selected.money"
      type="number"
      class="border-black border rounded p-1"
      @change="emits('updatePlayer', selected)"
    >
    <br>
  </form>
</template>
