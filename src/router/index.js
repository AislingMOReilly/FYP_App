import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: () =>
  //   import(/* webpackChunkName: "register" */ "../views/Home.vue"),
  // },
  {
    path: "/",
    name: "Home",
    component: () =>
    import(/* webpackChunkName: "dashboard" */ "../views/Assessment.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/assessment",
    name: "Assessment",
    component: () =>
      import(/* webpackChunkName: "assessment" */ "../views/Assessment.vue"),
  },
  {
    path: "/images",
    name: "Images",
    component: () =>
      import(/* webpackChunkName: "images" */ "../views/Images.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
