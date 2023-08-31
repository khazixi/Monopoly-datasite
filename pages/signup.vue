<script setup lang="ts">
import { useUser } from "../composables/auth";

const user = useUser();
if (user.value) {
  await navigateTo("/");
}

const username = ref('')
// WARNING: Storing password in a ref might not be secure
const password = ref('')

const validSubmission = computed(
  () => (username.value.length > 7) && (password.value.length > 7)
)

async function handleSubmit(e: Event) {
  if (!(e.target instanceof HTMLFormElement)) return;
  // const formData = new FormData(e.target);
  await $fetch("/api/signup", {
    method: "post",
    body: {
      username: username.value,
      password: password.value,
    },
    redirect: "manual",
  });
  await navigateTo("/");
}
</script>

<template>
  <section class="h-full flex flex-col">
    <form
      class="flex flex-col border-gray-500 bg-gray-100 rounded border-2 p-2 items-center gap-4 m-24 mx-auto w-[18rem]"
      method="post"
      action="/api/signup"
      @submit.prevent="handleSubmit"
    >
      <h1 class="text-3xl text-zinc-800">
        Sign Up!
      </h1>
      <label for="username">Username</label>
      <input
        id="username"
        v-model="username"
        :class="(username.length > 7) ? 'border-green-700' : 'border-red-700'"
        class="border-2 rounded"
        type="text"
        name="username"
      >
      <label 
        :class="(username.length > 7) ? 'hidden' : ''"
        class="text-xs text-red-800">
        must be at least 8 characters long
      </label>
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        :class="(password.length > 7) ? 'border-green-700' : 'border-red-700'"
        class="border-2 rounded"
        type="password"
        name="password"
      >
      <label 
        :class="(password.length > 7) ? 'hidden' : ''"
        class="text-xs text-red-800">
        must be at least 8 characters long
      </label>
      <button
        type="submit"
        :disabled="!validSubmission"
        :class="validSubmission ? 'bg-green-600' : 'bg-red-800'"
        class="bg-zinc-600 text-white p-2 rounded-md text-center w-[10rem]"
      >
        Submit
      </button>
      <NuxtLink
        class="bg-blue-600 text-white p-2 rounded-md text-center w-[10rem]"
        to="/login"
      >
        Sign In
      </NuxtLink>
    </form>
  </section>
</template>
