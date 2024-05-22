import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ProfilePage from "../views/ProfilePage.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Store from "../views/Store.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/ProfilePage", component: ProfilePage },
  { path: "/Leaderboard", component: Leaderboard },
  { path: "/Store", component: Store },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
