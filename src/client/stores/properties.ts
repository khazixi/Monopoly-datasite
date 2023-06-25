import { Card, Property, Railroad, Utilities } from "@prisma/client";
import { useFetch } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { Housable } from "../lib/storage";
import { getType } from '../lib/util'
import { Spot } from "../lib/util";

export const useData = defineStore('properties', () => {
  const spots = ref<Spot[]>([])
  const cards = ref<Card[]>([])

  const spotIndex = ref(0)
  const cardIndex = ref(0)


  const selectedSpot = computed(() => spots.value[wrapIndex(spotIndex.value, spots.value)])
  const selectedCard = computed(() => cards.value[wrapIndex(cardIndex.value, cards.value)])

  const ownables = computed<Housable[]>(() => {
    const arr: Housable[] = []
    if (spots.value.length === 0) return arr
    spots.value.forEach(v => {
      const type = getType(v.id)
      if (type === 'Utility' || type === 'Railroad') {
        arr.push({ name: (v as Railroad | Utilities).name })
      } else if (type === 'Property') {
        arr.push({name: (v as Property).name, houses: 0})
      }
    })
    return arr
  })

  const isEmptySpot = computed(() => (spots.value.length === 0) ? true : false)
  const isEmptyCard = computed(() => (cards.value.length === 0) ? true : false)


  function wrapIndex(idx: number, arr: any[]) {
    return (idx % arr.length) + ((idx < 0) ? arr.length : 0)
  }

  async function fetchData() {
    const { data: fetchedSpots } = await useFetch('/api/spots').get().json<Spot[]>()
    const { data: fetchedCards } = await useFetch('/api/cards').get().json<Card[]>()

    spots.value = fetchedSpots.value ?? []
    cards.value = fetchedCards.value ?? []
  }

  onMounted(() => fetchData())

  return {
    spots,
    cards,
    ownables,
    spotIndex,
    cardIndex,
    isEmptyCard,
    isEmptySpot,
    selectedSpot,
    selectedCard
  }
})
