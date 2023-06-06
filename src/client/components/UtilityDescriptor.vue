<script setup lang="ts">
import { Utilities } from '@prisma/client';
const props = defineProps<{utility: Utilities}>()
</script>

<template>
  <p> <b>{{ utility.name }}</b></p>
  <p> If one "Utility" is owned rent is 4 times amount shown on dice.</p>
  <p> If one "Utilities" is owned rent is 10 times amount shown on dice.</p>
  <p></p>
  <p> Mortgage Value <b>M{{ utility.price / 2 }}</b></p>
</template>
