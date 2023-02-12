import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
  {
    path: "/sobre",
    name: "about",
    component: () => import("@/pages/About.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
