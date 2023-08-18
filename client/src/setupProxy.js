const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://vercel-test-one-drab.vercel.app',
      changeOrigin: true,
      
    })
  );
};