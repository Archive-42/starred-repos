import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV == "development" ? "your-base-api-url-here" : "";

createApp(App).mount("#app");
