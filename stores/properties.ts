import { Card } from "@prisma/client";
import { Housable } from "@/util/client";
import { getName, getType, Spot } from "@/util/helpers";

export const useData = defineStore("properties", () => {
  const spots = ref<Spot[]>([]);
  const cards = ref<Card[]>([]);

  const spotIndex = ref(0);
  const cardIndex = ref(0);

  const selectedSpot = computed(() => spots.value[wrapIndex(spotIndex.value, spots.value)]);
  const selectedCard = computed(() => cards.value[wrapIndex(cardIndex.value, cards.value)]);

  const ownables = computed<Housable[]>(() => {
    const a = spots.value.reduce<Housable[]>((acc, curr) => {
      acc.push({
        name: getName(curr),
        position: curr.id,
        houses: (getType(curr.id) === 'Property') ? 0 : undefined
      })
      return acc
    }, [])
    return a;
  });

  const isEmptySpot = computed(() => spots.value.length === 0);
  const isEmptyCard = computed(() => cards.value.length === 0);

  function wrapIndex(idx: number, arr: any[]) {
    return (idx % arr.length) + (idx < 0 ? arr.length : 0);
  }

  async function fetchData() {
    // INFO: Cards are commented out to save on bandwidth

    // const c = await $fetch('/api/cards')
    // cards.value = c ?? []

    const s = await $fetch('/api/spots', {
      method: 'GET',
    })
    spots.value = s ?? []
  }

  // NOTE: Removing this line to see if to test if it fixes Vercel
  // onMounted(() => fetchData());

  return {
    spots,
    cards,
    ownables,
    fetchData,
    spotIndex,
    cardIndex,
    isEmptyCard,
    isEmptySpot,
    selectedSpot,
    selectedCard,
  };
});
