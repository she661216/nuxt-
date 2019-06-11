module.exports = {
  isProduct: false,
  phpApi: 'http://api.inside.epyxw.net',
  cookie: {
    domain: '127.0.0.1',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    // maxAge: 1000 * 60 * 60,      // cookie 有效时长
    // expires: '',
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: false        // 是否允许重写
  }
}
