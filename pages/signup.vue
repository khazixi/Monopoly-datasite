<script setup lang="ts">
import { useUser } from "../composables/auth";

const user = useUser();
if (user.value) {
  await navigateTo("/");
}

async function handleSubmit(e: Event) {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);
  const a = {
    username: formData.get("username"),
    password: formData.get("password")
  }
  console.log(a);
  await $fetch("/api/signup", {
    method: "post",
    body: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
    redirect: "manual",
  });
  await navigateTo("/");
}
</script>

<template>
  <section class="border-black rounded border-2 flex m-2 flex-col p-2 items-center gap-4 w-1/2 mx-auto">
    <h1 class="text-2xl">Sign Up!</h1>
    <form class="flex flex-col gap-4" method="post" action="/api/signup" @submit.prevent="handleSubmit">
      <label for="username">Username</label>
      <input class="border rounded border-black" id="username" type="text" name="username" />
      <label for="password">Password</label>
      <input class="border rounded border-black" id="password" type="password" name="password" />
      <button type="submit" class="bg-black text-white p-2 rounded-md"> Submit </button>
    </form>
    <NuxtLink class="bg-blue-400 text-white p-2 rounded-md" to="/login">Sign In</NuxtLink>
  </section>
</template>
