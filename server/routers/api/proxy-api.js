/**
 * restful 代理请求
 */

const router = require('koa-router')()
const ProxyRequest = require('../../utils/proxy-request')

const routers = router
  .all('/*', async ctx => {
    let res = null
    const path = ctx.path
    if (path.indexOf('uc_') > 0 && (!ctx.session.userInfo || !ctx.session.userInfo.uid)) {
      res = {
        code: 401,
        msg: '未检测到登录账号，请先登录！'
      }
    } else {
      const method = ctx.method.toLowerCase()
      const url = `${GlobalConfig.phpApi}/${path.replace('/backend/', '')}`
      let params = ctx.request.body
      let headers = {
        'Content-Type': ctx.headers['Content-Type'],
        'User-Agent': ctx.headers['user-agent']
      }
      if (path.indexOf('uc_') > 0) {
        headers['authorization'] = ctx.session.userInfo.jwt
      }
      res = await ProxyRequest[method]({
        url,
        headers,
        params,
        ctx
      })
    }
    ctx.body = res
  })

module.exports = routers
