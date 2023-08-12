import { useUser } from "../composables/auth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const { data, error } = await useFetch('/api/user');
  if (error.value) throw createError("Failed to Fetch Data");
  user.value = data.value?.user ?? null;
});
