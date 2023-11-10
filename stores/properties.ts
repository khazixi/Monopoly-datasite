import { Housable } from "~/utils/client";

export const useData = defineStore("properties", () => {
  const spots = ref<GameData>(gameData.sort((a, b) => a.id - b.id));
  const cards = ref<CardData>(cardData.sort((a, b) => a.id - b.id));

  const spotIndex = ref(0);

  const selectedSpot = computed(() => spots.value[wrapIndex(spotIndex.value, spots.value)]);

  const ownables = computed<Housable[]>(() => {
    const a = spots.value.reduce<Housable[]>((acc, curr) => {
      if (getType(curr.id) === 'Drawable') return acc
      else if (getType(curr.id) === 'Error') return acc
      else if (getType(curr.id) === 'Special') return acc
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

  // NOTE: Removing this line to see if to test if it fixes Vercel

  return {
    spots,
    cards,
    ownables,
    spotIndex,
    // cardIndex,
    isEmptyCard,
    isEmptySpot,
    selectedSpot,
    // selectedCard,
  };
});
