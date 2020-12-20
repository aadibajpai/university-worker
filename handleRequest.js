const valid = ["university", "college", "institute"]

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const clientIP = request.headers.get("x-lookup-ip") || request.headers.get("CF-Connecting-IP")
  const query = `${LOOKUP}${clientIP}`
  const url = new URL(request.url)
  const referer = request.headers.get("Referer") || url

  let response;
  if (url.pathname === "/" && clientIP) {  // clientIP null for CF preview
    const found = await fetch(query)
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          const isp = data.isp
          if (valid.find(v => isp.toLowerCase().includes(v))) return isp
          const org = data.org
          if (valid.find(v => org.toLowerCase().includes(v))) return org
        }
        return ""
      });

    if (found) {
      await discordLogger(found, referer, clientIP);
      response = new Response(found, {status: 200})
      response.headers.set('Access-Control-Allow-Origin', "*")
      response.headers.append('Vary', 'Origin')
      return response
    }
  }
  response = new Response('not found', {status: 404})
  response.headers.set('Access-Control-Allow-Origin', "*")
  response.headers.append('Vary', 'Origin')
  return response
}

exports.handleRequest = handleRequest;