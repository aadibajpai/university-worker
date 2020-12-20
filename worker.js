const { handleRequest } = require("./handleRequest.js");

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function discordLogger(isp, referer, ipaddr) {
  // see ddos ip
  const url = `${DISCORD_WEBHOOK}`;
  const payload = {
    "embeds": [{
      "title": "University found ✨",
      "description": isp,
      "timestamp": new Date().toISOString(),
      "color": 3066993,  // green
      "fields": [
        {
          "name": "`Referer`",
          "value": referer
        },
        {
          "name": "`IP Address`",
          "value": ipaddr
        }
      ]
    }]
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch(err => console.warn(err));
}