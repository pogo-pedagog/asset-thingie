import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const el = document.getElementById("app");
if (el) {
  const pinia = createPinia();
  createApp(App).use(pinia).mount(el);
}
