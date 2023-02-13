import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: () => import("@/pages/Home.vue") },
  {
    path: "/detalhes/:name",
    name: "details",
    component: () => import("../pages/Details.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
