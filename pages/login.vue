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
  <section class="border-black rounded border-2 flex m-2 flex-col p-2 items-center gap-4 w-1/2 mx-auto">
    <h1 class="text-2xl">Log In!</h1>
    <form
      class="flex flex-col gap-4"
      method="post"
      action="/api/login"
      enctype="multipart/form-data"
      @submit.prevent="handleSubmit"
    >
      <label>Username: </label>
      <input id="username" type="text" name="username" class="border rounded border-black"/>
      <label>Password: </label>
      <input id="password" type="password" name="password" class="border rounded border-black"/>
      <button type="submit" class="bg-black text-white p-2 rounded-md">Submit</button>
    </form>
    <NuxtLink to="/signup" class="bg-blue-400 text-white p-2 rounded-md">Create an Account</NuxtLink>
  </section>
</template>
