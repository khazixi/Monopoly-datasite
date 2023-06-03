import "./style.css";

import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import HomePage from "./routes/HomePage.vue"
import AboutPage from "./routes/AboutPage.vue"

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  strict: true,
})

const app = createApp(App)

app.use(router)
app.mount("#app");
