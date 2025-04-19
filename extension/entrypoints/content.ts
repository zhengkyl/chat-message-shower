export default defineContentScript({
  matches: ["https://www.twitch.tv/popout/*/chat"],
  main() {
    console.log("Hello content.");
  },
});
