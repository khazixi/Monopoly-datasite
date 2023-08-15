<script setup lang="ts">
import { useUser } from "../composables/auth";

const user = useUser();
if (user.value) {
  await navigateTo("/");
}

async function handleSubmit(e: Event) {
  if (!(e.target instanceof HTMLFormElement)) {
    return;
  }
  const formData = new FormData(e.target);
  await $fetch("/api/login", {
    method: "POST",
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
  <section class="border-gray-500 bg-gray-100 rounded border-2 flex flex-col p-2 items-center gap-4 w-96 mx-auto">
    <h1 class="text-3xl text-zinc-800">Log In!</h1>
    <form class="flex flex-col gap-4" method="post" action="/api/login" enctype="multipart/form-data"
      @submit.prevent="handleSubmit">
      <label for="username">Username </label>
      <input id="username" type="text" name="username" class="border rounded border-black" />
      <label>Password </label>
      <input id="password" type="password" name="password" class="border rounded border-black" />
      <button type="submit" class="bg-zinc-600 text-white p-2 rounded-md">Submit</button>
      <NuxtLink to="/signup" class="bg-slate-600 text-white p-2 rounded-md text-center">Create an Account</NuxtLink>
    </form>
  </section>
</template>
