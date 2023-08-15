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
  <div class="bg-gray-200">
    <section class="border-gray-500 bg-gray-100 rounded border-2 flex flex-col p-2 items-center gap-4 w-96 mx-auto">
      <h1 class="text-3xl text-zinc-800">Sign Up!</h1>
      <form class="flex flex-col gap-4" method="post" action="/api/signup" @submit.prevent="handleSubmit">
        <label for="username">Username</label>
        <input class="border rounded border-black" id="username" type="text" name="username" />
        <label for="password">Password</label>
        <input class="border rounded border-black" id="password" type="password" name="password" />
        <button type="submit" class="bg-zinc-600 text-white p-2 rounded-md"> Submit </button>
        <NuxtLink class="bg-slate-600 text-white p-2 rounded-md text-center" to="/login">Sign In</NuxtLink>
      </form>
    </section>
  </div>
</template>
