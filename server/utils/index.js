const utils = {
  getClientIP: ctx => {
    var ipAddress
    const req = ctx.req
    var headers = req.headers
    // || headers['x-forwarded-for']
    var forwardedIpsStr = headers['x-real-ip']
    console.log('x-real-ip', forwardedIpsStr)
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null
    console.log('x-forwarded-for',  req.headers['x-forwarded-for'])
    console.log('req.connection.remoteAddress',  req.connection.remoteAddress)
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress
    }
    console.log('return', ipAddress)
    return ipAddress
  }
}
module.exports = utils
