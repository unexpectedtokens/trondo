import Vue from "vue";
import Router from "vue-router";
import Todos from "@/views/Todos.vue";
import Adder from "@/views/Adder.vue";
import Register from "@/views/Register.vue";
import Projects from "@/views/Projects.vue";
import Project from "@/views/Project.vue";
import Newproject from "@/views/Newproject.vue";
import Login from "@/views/Login.vue";
import Settings from "@/views/Settings.vue";
import axios from "axios";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    { path: "/register", component: Register, name: "register" },
    { path: "/login", component: Login, name: "login" },
    { path: "/projects", component: Projects, name: "Projects" },
    { path: "/project/:id", component: Project, name: "Project" },
    { path: "/newproject", component: Newproject, name: "Newproject" },
    { path: "/settings", component: Settings, name: "settings" },

    {
      path: "/",
      component: Todos,
      name: "home",
      meta: {
        requiresAuth: true
      }
    },
    { path: "/add", component: Adder }
  ]
});
router.beforeEach((to, from, next) => {
  // store.dispatch("changeRoute", to.name);
  if (to.name === "register" || to.name === "login") {
    next();
  }
  axios
    .get("http://localhost:4000/users/me")
    .then(user => {
      next();
    })
    .catch(e => {
      return;
    });
});

export default router;
