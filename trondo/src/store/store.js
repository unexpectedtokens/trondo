import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    strict: true,
    todos: [],
    projects: [],
    filterBy: "none",
    notifications: [],
    user: {},
    token: localStorage.getItem("token") || "",
    authorized: false,
    sideBarOpen: false,
    listener: null,
    background: "#dcedff",
    url: ""
  },
  getters: {
    getTodos: state => {
      if (state.filterBy === "none") {
        return state.todos;
      }
      return state.todos.filter(todo => todo.kind === state.filterBy);
    },
    getProjects: state => state.projects,
    getCurrentFilter: state => state.filterBy,
    getCurrentUser: state => state.user,
    checkIfAuth: state => state.authorized,
    getSidebarState: state => state.sideBarOpen,
    getNotifications: state => state.notifications,
    getBackground: state => state.background,
    getUrl: state => state.url
  },
  mutations: {
    changeBackground: (state, payload) => {
      state.background = payload;
    },
    toggleSidebar: state => {
      state.sideBarOpen = !state.sideBarOpen;
    },
    setFilter: (state, payload) => {
      state.filterBy = payload;
    },
    notify: (state, { message, type }) => {
      state.notifications.push({ message, type });
      setTimeout(() => {
        const index = state.notifications.findIndex(x => x.message === message);
        state.notifications.splice(index, 1);
      }, 9000);
    },
    authorize: (state, payload) => {
      state.authorized = true;
      // const user = {
      //   name: payload.user.name,
      //   email: payload.user.email,
      //   id: payload.user.uid
      // };
      state.user = payload.user;
      state.token = payload.token;
      state.background = payload.user.background;
    },
    unAuthorize: state => {
      state.authorized = false;
      state.user = {};
    },
    handleFetchedTodos: (state, todos) => {
      state.todos = todos;
    },
    handleFetchedProjects: (state, projects) => {
      state.projects = projects;
    },
    removeNotification: (state, { index }) => {
      state.notifications.splice(index, 1);
    },
    changeUrl: (state, url) => {
      state.url = url;
    }
  },
  actions: {
    register: ({ commit }, { email, password, name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:4000/users", { email, password, name })
          .then(response => {
            const token = response.data.token;
            const user = response.data.user;
            commit("authorize", { user, token });
            localStorage.setItem("token", { token, user });
            axios.defaults.headers.common["Authorization"] = token;
            commit("notify", {
              message: `Welcome ${user.name}`,
              type: "success"
            });
            resolve(response);
          })
          .catch(e => {
            reject(e);
            localStorage.removeItem("token");
          });
      });
    },
    login: ({ commit }, { email, password }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:4000/users/login", { email, password })
          .then(response => {
            const token = response.data.token;
            const user = response.data.user;
            commit("authorize", { user, token });
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("notify", {
              message: `Welcome ${user.name}`,
              type: "success"
            });
            resolve(response);
          })
          .catch(e => {
            reject(e);
            commit("notify", { message: "Invalid credentials", type: "error" });
          });
      });
    },
    logOut: ({ commit }) => {
      localStorage.removeItem("token");
      commit("unAuthorize");
      axios.post("http://localhost:4000/users/logout");
    },

    addTodo: ({ commit }, { title, kind, due, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:4000/tasks", { title, kind, due, id })
          .then(response => resolve(response));
      });
    },
    handleFetchedTodos: ({ commit }, payload) => {
      axios.get("http://localhost:4000/tasks").then(data => {
        commit("handleFetchedTodos", data.data);
      });
    },
    removeTodo: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:4000/tasks/${id}`).then(response => {
          commit("notify", {
            message: "Successfully deleted task",
            type: "success"
          });
          resolve(response);
        });
      });
    },
    checkIfAuth: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:4000/users/me")
          .then(response => {
            commit("authorize", {
              user: response.data,
              token: localStorage.getItem("token")
            });
            resolve();
          })
          .catch(e => reject(e));
      });
    },
    notify: ({ commit }, payload) => {
      commit("notify", payload);
    },
    setFilter: ({ commit }, payload) => {
      commit("setFilter", payload);
    },
    toggleSidebar: ({ commit }) => {
      commit("toggleSidebar");
    },
    removeNotification: ({ commit }, payload) => {
      commit("removeNotification", payload);
    },
    //project related actions
    addNewProject: ({ commit }, payload) => {
      axios.post("http://localhost:4000/projects", { title: payload.title });
    },
    getUserProjects: ({ commit }, payload) => {
      axios.get("http://localhost:4000/projects").then(response => {
        commit("handleFetchedProjects", response.data);
      });
    },
    changeBackgroundAction: ({ commit }, payload) => {
      commit("changeBackground", payload);
      axios.patch("http://localhost:4000/users/me", { background: payload });
    },
    changeUrl: ({ commit }, payload) => {
      commit("changeUrl", payload);
    }
  }
});
