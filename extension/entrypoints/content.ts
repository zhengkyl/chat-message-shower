export default defineContentScript({
  matches: ["*://www.twitch.tv/popout/*/chat"],
  main(ctx) {
    console.log("Hello content. update 8");
  },
});
