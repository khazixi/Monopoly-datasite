<script setup lang="ts">
import { getType, getHousePrice, getName } from '@/util/helpers'
import type { Spot } from '@/util/helpers'
import type { Drawable, Property, Railroad, Special, Utilities } from '@prisma/client'
const props = defineProps<{ spot: Spot }>()

const spotType = computed(() => {
  return getType(props.spot.id)
})
</script>

<template>
  <!-- NOTE: Replace with a CDN? -->
  <section v-if="spotType === 'Property'">
    <p>Title Deed <b>{{ (spot as Property).name }}</b></p>
    <p> Rent <b> M{{ (spot as Property).rent[0] }} </b> </p>
    <p> Rent with color set <b> M{{ (spot as Property).rent[1] }} </b> </p>
    <p> Rent with 1 House <b> M{{ (spot as Property).rent[2] }} </b> </p>
    <p> Rent with 2 Houses <b> M{{ (spot as Property).rent[3] }} </b> </p>
    <p> Rent with 3 Houses <b> M{{ (spot as Property).rent[4] }} </b> </p>
    <p> Rent with 4 Houses <b> M{{ (spot as Property).rent[5] }} </b> </p>
    <p> With Hotel <b> M{{ (spot as Property).rent[6] }} </b> </p>
    <br>
    <p> Mortgage Value <b> M{{ (spot as Property).price / 2 }} </b> </p>
    <p> House Cost <b> M{{ getHousePrice(spot.id) }} </b> each</p>
    <p> Hotels Cost <b> M{{ getHousePrice(spot.id) }} </b> each</p>
    <p> (plus 4 houses)</p>
  </section>
  <section v-else-if="spotType === 'Railroad'">
    <p> {{ getName(spot) }}</p>
    <p> Rent <b>M{{ (spot as Railroad).rent[0] }}</b></p>
    <p> If 2 R'R are owned <b>M{{ (spot as Railroad).rent[1] }}</b></p>
    <p> If 3 R'R are owned <b>M{{ (spot as Railroad).rent[2] }}</b></p>
    <p> If 4 R'R are owned <b>M{{ (spot as Railroad).rent[3] }}</b></p>
    <br>
    <p> Mortgage Value <b>M{{ (spot as Railroad).price / 2 }}</b></p>
  </section>
  <section v-else-if="spotType === 'Utility'">
    <p> <b>{{ (spot as Utilities).name }}</b></p>
    <p> If one "Utility" is owned rent is 4 times amount shown on dice.</p>
    <p> If one "Utilities" is owned rent is 10 times amount shown on dice.</p>
    <br>
    <p> Mortgage Value <b>M{{ (spot as Utilities).price / 2 }}</b></p>
  </section>
  <p v-else-if="spotType === 'Special'"> {{ (spot as Special).description }} </p>
  <section v-else-if="spotType === 'Drawable'">
    <p>
      {{ (spot as Drawable).type }}
    </p>
  </section>
  <section v-else>
    <p> <b> Error! </b> </p>
  </section>
</template>
