const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        proxy(
            'https://www.juhe.cn/docs/api/id/18', {
                target: 'http://localhost:8090/',
                changeOrigin: true
            }
        )
    )
}