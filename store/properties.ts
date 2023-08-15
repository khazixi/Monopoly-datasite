import { Card } from "@prisma/client";
import { Housable } from "@/util/client";
import { getName, getType, Spot } from "@/util/helpers";

export const useData = defineStore("properties", () => {
  const spots = ref<Spot[]>([]);
  const cards = ref<Card[]>([]);

  const spotIndex = ref(0);
  const cardIndex = ref(0);

  const selectedSpot = computed(
    () => spots.value[wrapIndex(spotIndex.value, spots.value)],
  );
  const selectedCard = computed(
    () => cards.value[wrapIndex(cardIndex.value, cards.value)],
  );

  const ownables = computed<Housable[]>(() => {
    const arr: Housable[] = [];
    if (spots.value.length === 0) return arr;
    spots.value.forEach((v) => {
      const type = getType(v.id);
      if (type === "Utility" || type === "Railroad") {
        arr.push({ name: getName(v) ?? 'name', id: v.id });
      } else if (type === "Property") {
        arr.push({ name: getName(v) ?? 'name', houses: 0, id: v.id });
      }
    });
    return arr;
  });

  const isEmptySpot = computed(() => (spots.value.length === 0 ? true : false));
  const isEmptyCard = computed(() => (cards.value.length === 0 ? true : false));

  function wrapIndex(idx: number, arr: any[]) {
    return (idx % arr.length) + (idx < 0 ? arr.length : 0);
  }

  async function fetchData() {
    // BUG: Only the last await call sends data down on the server
    const { data: fetchedCards } = await useFetch("/api/cards");
    const { data: fetchedSpots } = await useFetch("/api/spots");

    spots.value = fetchedSpots.value ?? [];
    cards.value = fetchedCards.value ?? [];
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
