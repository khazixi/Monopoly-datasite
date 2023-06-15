<script setup lang="ts">
import CardViewer from '../components/CardViewer.vue'
import CardTable from '../components/CardTable.vue'
</script>

<template>
  <!-- <h1 class="text-3xl text-center font-bold">Welcome to the home page!</h1> -->
  <!-- <h2>Tested Component</h2> -->
  <Suspense>
    <!-- INFO: CardViewer deals with querying data -->
    <CardViewer />
  </Suspense>

  <Suspense>
    <CardTable />
  </Suspense>

  <!-- <h2 class="text-2xl text-center"> Browse all the properties</h2> -->
  <!-- <p>Home data will go here</p> -->
</template>
