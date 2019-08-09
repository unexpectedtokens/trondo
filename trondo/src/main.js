import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import { store } from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.prototype.$http = axios;
library.add(faBars, faTrash, faTimes);
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
new Vue({ store, router, render: h => h(App) }).$mount("#app");
