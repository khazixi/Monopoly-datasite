<template>
  <article class="flex flex-col items-center">
    <h1 class="text-4xl text-center mt-8 mb-4">Welcome to the Home Page</h1>

    <h2 class="text-2xl text-center mt-8 mb-4">View All Monopoly Spots</h2>
    <SpotViews />

    <h2 class="text-2xl text-center mt-8 mb-4">
      Store Your Game States
      <NuxtLink to="/store" class="text-white p-2 bg-slate-600 rounded-lg w-1/12">Here!</NuxtLink>
    </h2>
  </article>
</template>
