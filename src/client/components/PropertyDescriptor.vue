<script setup lang="ts">
import { getHousePrice } from '../lib/util'
import { Property } from '@prisma/client';
const props = defineProps<{property: Property}>()
</script>
<template>
  <p>Title Deed <b>{{ property.name }}</b></p>
  <p> Rent <b> M{{ property.rent[0] }} </b> </p>
  <p> Rent with color set <b> M{{ property.rent[1] }} </b> </p>
  <p> Rent with 1 House <b> M{{ property.rent[2] }} </b> </p>
  <p> Rent with 2 Houses <b> M{{ property.rent[3] }} </b> </p>
  <p> Rent with 3 Houses <b> M{{ property.rent[4] }} </b> </p>
  <p> Rent with 4 Houses <b> M{{ property.rent[5] }} </b> </p>
  <p> With Hotel <b> M{{ property.rent[6] }} </b> </p>
  <p></p>
  <p> Mortgage Value <b> M{{ property.price / 2 }} </b> </p>
  <p> House Cost <b> M{{ getHousePrice(property.color) }} </b> each</p>
  <p> Hotels Cost <b> M{{ getHousePrice(property.color) }} </b> each</p>
  <p> (plus 4 houses)</p>
</template>
