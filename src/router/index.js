import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      redirect: "home"
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/tutorials",
      name: "tutorials",
      component: () => import("../learning/pages/tutorial-list.component.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../security/pages/sign-in.component.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../security/pages/sign-up.component.vue"),
    },
  ],
});

export default router;
