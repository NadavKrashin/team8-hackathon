import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import ProfileView from "../views/ProfileView.vue";
import LeaderboardsView from "../views/LeaderboardsView.vue";
import StoreView from "../views/StoreView.vue";
import adminpictures from "../views/adminpictures.vue";
import DishesUpload from "../components/Task/ImageTasks/DishesUpload.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/task/:id",
    name: "Task",
    component: TaskView,
    children: [
      {
        path: "dishes", // Nested route path
        component: DishesUpload, // Nested route component
      },
      // Other child routes can be defined here
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/leaderboards",
    name: "Leaderboards",
    component: LeaderboardsView,
  },
  {
    path: "/store",
    name: "Store",
    component: StoreView,
  },
  {
    path: "/adminpictures",
    name: "adminpictures",
    component: adminpictures,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
