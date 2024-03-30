Bun.serve({
  port: 8081,
  fetch(req) {
    return new Response(Bun.file("./index.html"), {
      headers: {
      "Content-Security-Policy": "script-src 'nonce-abc'; report-uri /csp-report;",
      // "Content-Security-Policy": "script-src 'self' 'unsafe-inline' https://*.cloudflare.com:*;",
      "Content-Security-Policy-Report-Only": "script-src 'nonce-abc'; report-uri /csp-report;"
      }
    });
  },
})
