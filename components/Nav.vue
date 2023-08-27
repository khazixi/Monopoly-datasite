<script setup lang="ts">
const user = useUser()

async function handleClick() {
  await $fetch('/api/logout', { method: 'POST' })
  await navigateTo('/login')
}

</script>

<template>
  <nav class="bg-zinc-800 py-4 flex flex-row ">
    <NuxtLink class="text-white p-4 bg-gray-600 rounded-md mx-2" to="/">Home </NuxtLink>
    <NuxtLink class="text-white p-4 bg-gray-600 rounded-md mx-2" to="/store">Saver </NuxtLink>
    <NuxtLink class="text-white p-4 bg-gray-600 rounded-md mx-2" to="/about">About </NuxtLink>

    <NuxtLink class="text-white p-4 bg-gray-600 rounded-md mx-2 ml-auto" to="/profile"> Profile </NuxtLink>
    <button v-if="user" @click="handleClick" class="text-white p-2 bg-blue-600 rounded-md mr-2"> Log Out</button>
    <NuxtLink v-else class="text-white ml-auto p-4 bg-blue-600 rounded-md mr-2" to="/signup"> Sign Up</NuxtLink>
  </nav>
</template>
