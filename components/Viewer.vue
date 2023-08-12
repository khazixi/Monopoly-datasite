<script setup lang="ts">
import { Person } from "../util/client";

const props = defineProps<{ player: Person; index: number }>();
const emits = defineEmits<{
  selectPlayer: [index: number];
  deletePlayer: [idx: number];
}>();
</script>

<template>
  <form @submit.prevent class="border-solid border-2 rounded border-black m-2">
    <label>{{ player.name }}</label>
    <br>
    <button class="bg-black text-white p-2 rounded-md m-2" @click="emits('selectPlayer', index)">Select</button>
    <button class="bg-black text-white p-2 rounded-md m-2" @click="emits('deletePlayer', index)">Remove</button>
  </form>
</template>
