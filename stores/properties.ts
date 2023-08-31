import { Housable } from "@/util/client";
import { getName, getType } from "@/util/helpers";
import { pgCard, pgDrawable, pgProperty, pgSpecial } from "~/server/util/schema";

export const useData = defineStore("properties", () => {
  const spots = ref<Array<pgSpecial | pgDrawable | pgProperty>>([]);
  const cards = ref<pgCard[]>([]);

  const spotIndex = ref(0);
  // const cardIndex = ref(0);

  const selectedSpot = computed(() => spots.value[wrapIndex(spotIndex.value, spots.value)]);
  // const selectedCard = computed(() => cards.value[wrapIndex(cardIndex.value, cards.value)]);

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

  async function fetchData() {
    // INFO: Cards are commented out to save on bandwidth

    // const c = await $fetch('/api/cards')
    // cards.value = c ?? []

    const s = await $fetch('/api/spots', {
      method: 'GET',
    })

    if (s.length === 0) {
      spots.value = []
      return
    }

    spots.value = s.sort((a, b) => a.id - b.id)
  }

  // NOTE: Removing this line to see if to test if it fixes Vercel
  onMounted(() => fetchData());

  return {
    spots,
    cards,
    ownables,
    fetchData,
    spotIndex,
    // cardIndex,
    isEmptyCard,
    isEmptySpot,
    selectedSpot,
    // selectedCard,
  };
});
