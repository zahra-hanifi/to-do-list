import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import axios from "./plugins/axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faPlus,
  faCircleCheck,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import './registerServiceWorker'

library.add(faPlus, faCircleCheck, faTrash, faCheck);

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.prototype.$http = axios;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
