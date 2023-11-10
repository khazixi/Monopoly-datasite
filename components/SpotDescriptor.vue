<script setup lang="ts">
const props = defineProps<{ spot: GameData[0] }>()

const spotType = computed(() => {
  return getType(props.spot.id)
})
</script>

<template>
  <section v-if="spotType === 'Property'">
    <p>Title Deed <b>{{ (spot as PropertyData).name }}</b></p>
    <p> Rent <b> M{{ (spot as PropertyData).rent[0] }} </b> </p>
    <p> Rent with color set <b> M{{ (spot as PropertyData).rent[1] }} </b> </p>
    <p> Rent with 1 House <b> M{{ (spot as PropertyData).rent[2] }} </b> </p>
    <p> Rent with 2 Houses <b> M{{ (spot as PropertyData).rent[3] }} </b> </p>
    <p> Rent with 3 Houses <b> M{{ (spot as PropertyData).rent[4] }} </b> </p>
    <p> Rent with 4 Houses <b> M{{ (spot as PropertyData).rent[5] }} </b> </p>
    <p> With Hotel <b> M{{ (spot as PropertyData).rent[6] }} </b> </p>
    <br>
    <p> Mortgage Value <b> M{{ (spot as PropertyData).price / 2 }} </b> </p>
    <p> House Cost <b> M{{ getHousePrice(spot.id) }} </b> each</p>
    <p> Hotels Cost <b> M{{ getHousePrice(spot.id) }} </b> each</p>
    <p> (plus 4 houses)</p>
  </section>
  <section v-else-if="spotType === 'Railroad'">
    <p> {{ getName(spot) }}</p>
    <p> Rent <b>M{{ (spot as PropertyData).rent[0] }}</b></p>
    <p> If 2 R'R are owned <b>M{{ (spot as PropertyData).rent[1] }}</b></p>
    <p> If 3 R'R are owned <b>M{{ (spot as PropertyData).rent[2] }}</b></p>
    <p> If 4 R'R are owned <b>M{{ (spot as PropertyData).rent[3] }}</b></p>
    <br>
    <p> Mortgage Value <b>M{{ (spot as PropertyData).price / 2 }}</b></p>
  </section>
  <section v-else-if="spotType === 'Utility'">
    <p> <b>{{ (spot as PropertyData).name }}</b></p>
    <p> If one "Utility" is owned rent is 4 times amount shown on dice.</p>
    <p> If one "Utilities" is owned rent is 10 times amount shown on dice.</p>
    <br>
    <p> Mortgage Value <b>M{{ (spot as PropertyData).price / 2 }}</b></p>
  </section>
  <p v-else-if="spotType === 'Special'"> {{ (spot as SpecialData).description }} </p>
  <section v-else-if="spotType === 'Drawable'">
    <p>
      {{ (spot as DrawableData).type }}
    </p>
  </section>
  <section v-else>
    <p> <b> Error! </b> </p>
  </section>
</template>
