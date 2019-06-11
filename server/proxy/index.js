const proxyMiddleware = require('http-proxy-middleware')

module.exports = (app) => {
  let proxyTable = require('./proxy.conf')(app)
  Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
      options = {target: options}
    }
    app.use((ctx, next) => {
      if (ctx.url.indexOf('/test/api') >= 0) {
        console.log(GlobalConfig.phpApi)
        return proxyMiddleware(options.filter || context, options)(ctx.req, ctx.res, next)
      }
      return next()
    })
  })
}



