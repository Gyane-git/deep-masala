const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4488;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const pathname = url.pathname;

      // Custom routing
      if (pathname === "/a") {
        await app.render(req, res, "/a", Object.fromEntries(url.searchParams));
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", Object.fromEntries(url.searchParams));
      } else if (pathname === "/") {
        await app.render(req, res, "/", Object.fromEntries(url.searchParams));
      } else {
        // All other pages, including API routes
        await handle(req, res, url);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
