import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import router from "./router";

const customTheme = {
  dark: false,
  colors: {
    primary: "#262847",
    secondary: "#fcc725",
    error: "#f44336",
    info: "#2196F3",
    success: "#4caf50",
    warning: "#fb8c00",
  },
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme,
    },
  },
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(vuetify, { rtl: true, iconfont: "md" })
  .mount("#app");
