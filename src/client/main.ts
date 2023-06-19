import "./style.css";

import { createApp } from "vue";
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import HomePage from "./routes/HomePage.vue"
import AboutPage from "./routes/AboutPage.vue"
import StoragePage from './routes/StoragePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/store', component: StoragePage },
  { path: '/about', component: AboutPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: true,
})

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app");
