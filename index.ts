const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;
    if (req.method === "POST" && path === "/csp-report") {
      const data = await req.json();
      console.log("Received JSON:", data);
      return Response.json({ success: true, data });
    }
    if (path === "/csp-no-violation") {
      return new Response(Bun.file("./index.html"), {
        headers: {
          "Content-Security-Policy": "script-src 'nonce-abc';",
          "Content-Security-Policy-Report-Only":
            "script-src 'nonce-abc'; report-uri /csp-report;",
        },
      });
    }
    return new Response(Bun.file("./index.html"), {
      headers: {
        "Content-Security-Policy":
          "script-src 'self' 'unsafe-inline' https://*.cloudflare.com:*;",
        "Content-Security-Policy-Report-Only":
          "script-src 'nonce-abc'; report-uri /csp-report;",
      },
    });
  },
});

console.log(`Listening on ${server.url}`);
