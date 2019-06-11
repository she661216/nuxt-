const utils = require('../utils/index')

// GlobalConfig.phpApi
function getProxyObj (app, pathRewrite) {
  return {
    target: GlobalConfig.phpApi,
    protocolRewrite: 'http',
    secure: false,
    changeOrigin: false,
    pathRewrite: pathRewrite,
    router: function (req) {
      return GlobalConfig.phpApi
    },
    onError: function (err, req, res) {
      console.error(err)
    },
    onProxyReq: function onProxyReq (proxyReq, req, res) {
    //  console.log(req.url)
      // if (req.session) {
      //     proxyReq.setHeader('token', )
      // }
    //  console.log(req.method)
      proxyReq.setHeader('x-forwarded-for', utils.getClientIP(req))
      // proxyReq.setHeader('Content-Type', req.headers['Content-Type'])
    },
    onProxyRes: function onProxyRes (proxyRes, req, res) {

    },
    logLevel: 'debug'
  }
}

module.exports = app => {
  return {
    '/test/api': getProxyObj(app, {'^/test/api': '/api'})
    // '/backend/api': 'http://10.0.100.80:80'
  }
}
