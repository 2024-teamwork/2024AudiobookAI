const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://audioai.alphalio.cn",
      changeOrigin: true,
      onProxyRes(proxyRes, req, res) {
        // Remove invalid CORS headers from the backend response
        proxyRes.headers["Access-Control-Allow-Origin"] = req.headers.origin;
      },
    })
  );
};
