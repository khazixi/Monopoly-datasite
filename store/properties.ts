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

  // NOTE: Maybe this code could be cleaned up?
  const ownables = computed<Housable[]>(() => {
    const arr: Housable[] = [];
    if (spots.value.length === 0) return arr;
    spots.value.forEach((v) => {
      const type = getType(v.id);
      if (type === "Utility" || type === "Railroad") {
        arr.push({ name: getName(v) ?? 'name', position: v.id });
      } else if (type === "Property") {
        arr.push({ name: getName(v) ?? 'name', houses: 0, position: v.id });
      }
    });
    return arr;
  });

  const isEmptySpot = computed(() => spots.value.length === 0);
  const isEmptyCard = computed(() => cards.value.length === 0);

  function wrapIndex(idx: number, arr: any[]) {
    return (idx % arr.length) + (idx < 0 ? arr.length : 0);
  }

  async function fetchData() {
    // BUG: Only the last await call sends data down on the server
    const c = await useFetch('/api/cards')
    const s = await useFetch('/api/spots')

    cards.value = c.data.value ?? []
    spots.value = s.data.value ?? []
  }

  onMounted(() => fetchData());

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
