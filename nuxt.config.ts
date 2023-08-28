// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  nitro: {
    preset: 'vercel',
		moduleSideEffects: ["lucia/polyfill/node"],
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/eslint-module",
    "@pinia/nuxt"
  ],
});
