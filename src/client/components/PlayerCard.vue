<script setup lang="ts">
import { Person } from '../lib/storage'
const props = defineProps<{ player: Person }>()
const emits = defineEmits<{}>()
</script>

<template>
  <header>
    <h2> {{ player.name }} </h2>
  </header>

  <section>
    <details>
      <summary> Properties </summary>
      <ul>
        <li v-for="owned in player.owned">
          {{ owned }}
        </li>
      </ul>
    </details>
    <button @click=""> Select </button>
  </section>
</template>
