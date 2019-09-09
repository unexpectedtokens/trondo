import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const endpoint = "http://localhost:4000";

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
    url: "",
    dailytasks: []
  },
  getters: {
    getTodos: state => {
      if (state.filterBy === "none") {
        return state.todos;
      }
      return state.todos.filter(todo => todo.kind === state.filterBy);
    },
    getDailyTasks: state => state.dailytasks,
    getCurrentFilter: state => state.filterBy,
    getCurrentUser: state => state.user,
    checkIfAuth: state => state.authorized,
    getSidebarState: state => state.sideBarOpen,
    getNotifications: state => state.notifications,
    getBackground: state => state.background,
    getUrl: state => state.url
  },
  mutations: {
    setDailyTasks: (state, { tasks }) => {
      state.dailytasks = tasks;
    },
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
    handleFetchedProjectTasks: (state, projectTasks) => {
      state.projectTasks = projectTasks;
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
          .post(endpoint + "/users", { email, password, name })
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
          .post(endpoint + "/users/login", { email, password })
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
      axios.post(endpoint + "/users/logout");
    },

    addTodo: ({ commit }, { title, kind, due, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post(endpoint + "/tasks", { title, kind, due, id })
          .then(response => resolve(response));
      });
    },
    handleFetchedTodos: ({ commit }, payload) => {
      axios.get(endpoint + "/tasks").then(data => {
        commit("handleFetchedTodos", data.data);
      });
    },
    removeTodo: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios.delete(`${endpoint}/tasks/${id}`).then(response => {
          commit("notify", {
            message: "Successfully deleted task",
            type: "success"
          });
          resolve(response);
        });
      });
    },
    checkIfAuth: async ({ commit }) => {
      if (localStorage.getItem("token")) {
        let user = await axios.get(endpoint + "/users/me");
        commit("authorize", {
          user: user.data,
          token: localStorage.getItem("token")
        });
      }
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
      axios.post(endpoint + "/projects", { title: payload.title });
    },
    getUserProjects: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(endpoint + "/projects").then(response => {
          commit("handleFetchedProjects", response.data);
          return resolve(response.data);
        });
      });
    },
    addDailyTask: ({ commit }, { title }) => {
      axios.post(`${endpoint}/dtasks`, { title }).then(tasks => {
        commit("setDailyTasks", { tasks: tasks.data });
      });
    },
    getDailyTasks: ({ commit }) => {
      axios
        .get(`${endpoint}/dtasks`)
        .then(tasks => {
          if (tasks.data.length == 0) {
            commit("notify", {
              message: "You have no daily tasks yet",
              type: "success"
            });
            return commit("setDailyTasks", []);
          }
          commit("setDailyTasks", { tasks: tasks.data });
        })
        .catch(e =>
          commit("notify", {
            message: "Something went wrong",
            type: e
          })
        );
    },
    completeDailyTask: ({ commit }, { id }) => {
      axios.patch(`${endpoint}/dtasks/${id}`).then(tasks => {
        if (tasks.data.length == 0) {
          commit("notify", {
            message: "You have no daily tasks yet",
            type: "success"
          });
          return commit("setDailyTasks", []);
        }
        commit("setDailyTasks", { tasks: tasks.data });
        if (tasks.data.filter(task => task._id === id)[0].completed) {
          commit("notify", { message: "Nice job!", type: "success" });
        }
      });
    },
    deleteDailyTask: ({ commit }, { id }) => {
      axios.delete(`${endpoint}/dtasks/${id}`).then(tasks => {
        if (tasks.data.length == 0) {
          commit("notify", {
            message: "You have no daily tasks yet",
            type: "success"
          });
          return commit("setDailyTasks", []);
        }
        commit("setDailyTasks", { tasks: tasks.data });
      });
    },
    changeBackgroundAction: ({ commit }, payload) => {
      commit("changeBackground", payload);
      axios.patch(endpoint + "/users/me", { background: payload });
    },
    changeUrl: ({ commit }, payload) => {
      commit("changeUrl", payload);
    }
  }
});
