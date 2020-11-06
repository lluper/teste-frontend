import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import "./assets/global.css";
Vue.config.productionTip = false;

Vue.prototype.$appName = "Teste front Leonardo Luper";
Vue.prototype.$API_KEY = ""; // Inserir sua API_KEY

localStorage.clear();
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
