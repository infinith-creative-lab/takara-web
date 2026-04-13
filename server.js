const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Cek apakah sedang mode development atau production
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
// cPanel / Phusion Passenger biasanya akan menyuntikkan PORT spesifik
const port = process.env.PORT || 3000;

// Inisialisasi Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse request URL
      const parsedUrl = parse(req.url, true);
      
      // Biarkan Next.js yang menangani seluruh request dan routing
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port} (NODE_ENV: ${process.env.NODE_ENV})`);
    });
});
