<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useData } from "@/store/properties";
import { Housable } from "util/client";

const props = defineProps<{ houses: Housable[] }>();
const emits = defineEmits(["selected"]);
const text = ref("");

const store = useData();
const { ownables } = storeToRefs(store);

const searchItems = computed<Housable[]>(() => {
  if (!ownables) return [];
  if (text.value === "") return [];

  let matched = 0;

  return ownables.value.filter((val) => {
    if (
      props.houses &&
      props.houses.findIndex((v) => v.name === val.name) !== -1
    )
      return false;
    if (
      val.name.toLowerCase().includes(text.value.toLowerCase()) &&
      matched < 5
    ) {
      matched++;
      return true;
    }
  });
});
</script>

<template>
  <div class="px-2 sm:w-max">
    <input
      v-model="text"
      class="border-slate-800 bg-slate-300 p-2 border-2 border-solid rounded-t-sm px-2 w-full"
      :class="(!text.length) ? 'rounded-b-sm' : ''"
      type="search"
      placeholder="Enter property name"
    >
    <ul
      v-if="text.length"
      class="list-none border-x-2 border-b-2 border-solid border-black rounded-b-lg"
    >
      <li
        v-for="searchItem in searchItems"
        :key="searchItem.name"
        class="hover:bg-gray-500 p-2"
        @click="emits('selected', searchItem)"
      >
        {{ searchItem.name }}
      </li>
    </ul>
  </div>
</template>
