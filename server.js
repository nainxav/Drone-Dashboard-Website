const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/foto",
  createProxyMiddleware({
    target: "http://127.0.0.1:5000",
    changeOrigin: true,
    // PENTING: JANGAN HAPUS /foto
    pathRewrite: (path) => path,
    logLevel: "debug",
  })
);

app.listen(8080, () => {
  console.log("Node running at http://127.0.0.1:8080");
});
