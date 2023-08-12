<template>
  <article class="flex flex-col items-center">
    <h1 class="text-4xl text-center my-4">Welcome to the Home Page</h1>

    <h2 class="text-2xl text-center">View All Monopoly Spots</h2>

    <h2 class="text-2xl text-center">Store Your Game States</h2>
    <NuxtLink to="/store" class="text-white p-2 bg-green-600 rounded-lg w-1/12">Here!</NuxtLink>
    <p> {{ useUser() }}</p>
  </article>
</template>
