/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const api = require('./api/index')
const proxyApi = require('./api/proxy-api')

router.use('/font/api', api.routes(), api.allowedMethods())

if (process.env.NODE_ENV === 'development') {
  router.use('/backend/api', proxyApi.routes(), proxyApi.allowedMethods())
}

module.exports = router
