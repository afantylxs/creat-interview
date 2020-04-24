const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  // 接口代理设置
  app.use(
    proxy('/api', {
      target: 'http://47.92.48.141:8085/',
      changeOrigin: true,
    })
  );
};
