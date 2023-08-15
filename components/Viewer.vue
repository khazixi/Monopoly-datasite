<script setup lang="ts">
import { Person } from "../util/client";

const props = defineProps<{ player: Person; index: number }>();
const emits = defineEmits<{
  selectPlayer: [index: number];
  deletePlayer: [idx: number];
}>();
</script>

<template>
  <form @submit.prevent class="border-solid border-2 rounded border-black m-2 flex flex-col">
    <label class="p-4 text-center">{{ player.name }}</label>
    <button class="bg-gray-600 text-white p-2" @click="emits('selectPlayer', index)">Select</button>
    <button class="bg-zinc-300 text-white p-2 rounded-b-sm" @click="emits('deletePlayer', index)">Remove</button>
  </form>
</template>
