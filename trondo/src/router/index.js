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
// import axios from "axios";
import { store } from "@/store/store";
Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    { path: "/register", component: Register, name: "register" },
    {
      path: "/login",
      component: Login,
      name: "login"
    },
    {
      path: "/projects",
      component: Projects,
      name: "Projects",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/project/:id",
      component: Project,
      name: "Project",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/newproject",
      component: Newproject,
      name: "Newproject",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      component: Settings,
      name: "settings",
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/",
      component: Todos,
      name: "home",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add",
      component: Adder,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
router.onReady(() => {
  store.dispatch("checkIfAuth");
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem("token")) {
      next({ path: "/login", params: to.fullPath });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
