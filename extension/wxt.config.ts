import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/unocss", "@wxt-dev/module-solid"],
  manifest: {
    name: "Chat Message Shower",
  },
});
