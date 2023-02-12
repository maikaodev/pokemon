import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./global.scss";
import router from "./plugins/router.js";


createApp(App).use(createPinia()).use(router).mount("#app");
