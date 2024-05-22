import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  { path: "/task/:id", name: "Task", component: TaskView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
