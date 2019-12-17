const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://47.92.48.141/',
      //   target: 'http://localhost:8090/#/',
      changeOrigin: true
    })
  );
};
