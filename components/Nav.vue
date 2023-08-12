<script setup>
const user = useUser()

async function handleClick() {
  await $fetch('/api/logout', { method: 'POST' })
}

</script>

<template>
  <nav class="bg-black py-4">
    <NuxtLink class="text-white p-2 mx-2 bg-green-600 rounded-lg" to="/">Home (Under Construction)</NuxtLink>
    <NuxtLink class="text-white p-2 mx-2 bg-green-600 rounded-lg" to="/store">Saver (Under Construction)</NuxtLink>
    <NuxtLink class="text-white p-2 mx-2 bg-green-600 rounded-lg" to="/about">About (Under Construction)</NuxtLink>

    <button v-if="user" @click="handleClick" class="text-white p-2 mx-2 bg-green-600 rounded-lg"> Log Out</button>
    <NuxtLink v-else class="text-white p-2 mx-2 bg-green-600 rounded-lg" to="/signup"> Sign Up</NuxtLink>
  </nav>
</template>
