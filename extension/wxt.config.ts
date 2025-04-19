import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Chat Message Shower",
    content_scripts: [
      {
        matches: ["https://www.twitch.tv/popout/*/chat"],
        js: ["content-scripts/content.js"],
      },
    ],
  },
});
