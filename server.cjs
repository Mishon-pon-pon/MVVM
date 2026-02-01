const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 4173;
const distDir = path.join(__dirname, "dist");

// простейшая мапа MIME-типов
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  // нормализуем URL (без query)
  const urlPath = req.url.split("?")[0];

  // если это явный файл (есть точка) — пробуем отдать как статику
  let filePath = path.join(distDir, urlPath);
  const ext = path.extname(filePath);

  const sendFile = (fullPath, contentType) => {
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }

      res.statusCode = 200;
      res.end(data);
    });
  };

  if (ext) {
    // запрос типа /assets/main-xxxx.js, /style.css и т.п.
    const mime = mimeTypes[ext] || "application/octet-stream";
    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.statusCode = 404;
        res.end("Not Found");
        return;
      }

      sendFile(filePath, mime);
    });
  } else {
    // SPA‑роут (/counter, /profile и т.п.) — всегда отдаём index.html
    filePath = path.join(distDir, "index.html");
    sendFile(filePath, mimeTypes[".html"]);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
