Hooks.once('init', () => {
  console.log("SD IP Announcer module initializing");
  
  // Register a hidden setting to store the AI's IP info
  game.settings.register("sd-ip-announcer", "aiServerInfo", {
    name: "Stable Diffusion IP Info",
    hint: "Stores the latest IP and details from the Stable Diffusion service.",
    scope: "world",
    config: false,
    type: Object,
    default: {}
  });
})
