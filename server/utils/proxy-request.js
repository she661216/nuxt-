const request = require('request')
const utils = require('./index')

const ProxyRequest = {
  get ({url = '', headers = {}, params = {}, timeout = 60000, ctx}) {
    let paramString = ''
    Object.keys(params).forEach(key => {
      paramString += `&${key}=${params[key]}`
    })
    paramString && (url += '?' + paramString)
    return new Promise((resolve) => {
      request.get({
        url: url,
        headers: Object.assign(headers, {'X_NODE_REQUEST_IP': utils.getClientIP(ctx)}),
        timeout
      }, function (error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body)
        } else {
          resolve({
            success: false,
            code: 500,
            message: error.message || error.msg,
            data: error
          })
        }
      })
    })
  },
  post ({url = '', headers = {}, params = {}, timeout = 60000, ctx}) {
    return new Promise((resolve) => {
      request.post({
        url: url,
        headers: Object.assign(headers, {'X_NODE_REQUEST_IP': utils.getClientIP(ctx)}),
        // body: JSON.stringify(params),
        form: params,
        timeout
      }, function (error, res, body) {
        if (!error) {
          try {
            _body = JSON.parse(body)
            resolve(_body)
            return
          } catch (e) {
            resolve({
              code: 500,
              msg: '内部服务器错误',
              data: body
            })
            return
          }
        } else {
          resolve({
            code: 500,
            msg: '内部服务器错误',
            data: error
          })
          return
        }
      })
    })
  }
}

module.exports = ProxyRequest
