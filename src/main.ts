import { createApp } from "vue";
import App from "./App.vue";
import "./global.scss";
import router from "./plugins/router.js";

createApp(App).use(router).mount("#app");
