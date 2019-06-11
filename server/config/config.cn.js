module.exports = {
  isProduct: true,
  phpApi: 'http://api.inside.epyxw.cn',
  cookie: {
    domain: 'epyxw.cn',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    // maxAge: 1000 * 60 * 10,      // cookie 有效时长
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: false        // 是否允许重写
  }
}
