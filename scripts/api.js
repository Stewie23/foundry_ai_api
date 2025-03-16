// Wait for socketlib to be ready, then register our module's API
Hooks.once('socketlib.ready', () => {
  const socket = socketlib.registerModule('sd-ip-announcer');
  socket.register('announceAI', handleAIAnnouncement);
  console.log("SD IP Announcer API endpoint is ready via socketlib.");
});

// This function is our "API endpoint" handler
async function handleAIAnnouncement(data) {
  console.log("📡 Received Stable Diffusion announcement:", data);
  
  // Data expected from the client (your local stable diffusion) could be:
  // {
  //   localIP: "192.168.1.42",
  //   publicIP: "88.70.250.59",
  //   aiURL: "http://192.168.1.42:7860",
  //   service: "Stable Diffusion"
  // }
  
  // Save the incoming data along with a timestamp
  const storedInfo = {
    localIP: data.localIP,
    publicIP: data.publicIP || "Unknown",
    aiURL: data.aiURL || `http://${data.localIP}:7860`,
    timestamp: new Date().toISOString()
  };
  
  // Store the data in Foundry's world settings
  await game.settings.set("sd-ip-announcer", "aiServerInfo", storedInfo);
  console.log("✅ Stable Diffusion IP info updated in Foundry settings:", storedInfo);
  
  // Optionally, you can return a confirmation message
  return storedInfo;
}
