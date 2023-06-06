<script setup lang="ts">
import { Railroad } from '@prisma/client'
const props = defineProps<{railroad: Railroad}>()
</script>

<template>
  <p> {{ railroad.name }}</p>
  <p> Rent <b>M{{ railroad.rent[0] }}</b></p>
  <p> If 2 R'R are owned <b>M{{ railroad.rent[1] }}</b></p>
  <p> If 3 R'R are owned <b>M{{ railroad.rent[2] }}</b></p>
  <p> If 4 R'R are owned <b>M{{ railroad.rent[3] }}</b></p>
  <p></p>
  <p> Mortgage Value <b>M{{ railroad.price / 2 }}</b></p>
</template>
