<script setup lang="ts">
import { generateTailwindBackground, getDescription, getSpotName, getType, Spot } from "../lib/util"
const spot = defineProps<Spot>()
</script>

<template>
  <article>
    <header :spot=spot :class="'bg-' + generateTailwindBackground(spot)">
      <h2>
        {{ getSpotName(spot) }}
      </h2>
    </header>
    <section>
      {{
        getDescription(spot)
      }}
    </section>
  </article>
</template>
