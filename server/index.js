const Koa = require('koa')
const consola = require('consola')
const {Nuxt, Builder} = require('nuxt')
const routers = require('./routers/index')
const yxConfig = require(`./config/config.${process.env.YX_ENV}.js`)
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')

const app = new Koa()

app.context.yxConfig = yxConfig

global.GlobalConfig = yxConfig
const host = '0.0.0.0'
const port = 3000

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(app.env === 'production')
// 配置session中间件
app.use(session({
  key: 'YX_SESSION_ID',
  cookie: yxConfig.cookie
}))
app.use(bodyParser())
// init router
app.use(routers.routes()).use(routers.allowedMethods())

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)
  // Build in development
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session
 
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
