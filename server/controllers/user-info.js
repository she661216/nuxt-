const userInfoService = require('./../services/user-info')
const ProxyRequest = require('../utils/proxy-request')

module.exports = {

  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async login (ctx) {
    let formData = ctx.request.body
    let res = await ProxyRequest.post({
      url: `${GlobalConfig.phpApi}/api/login_do`,
      headers: {
        'Content-Type': ctx.headers['Content-Type'],
        'User-Agent': ctx.headers['user-agent']
      },
      params: formData,
      ctx
    })
    if (res.code === 200) {
      ctx.session.userInfo = {jwt: res.jwt} 
    }
    ctx.body = res
    return
  },

  /**
   * 注册操作
   * @param  {obejct} ctx 上下文对象
   */
  async register (ctx) {
    let formData = ctx.request.body
    let res = await ProxyRequest.post({
      url: `${GlobalConfig.phpApi}/api/login_register_do`,
      headers: {
        'Content-Type': ctx.headers['Content-Type'],
        'User-Agent': ctx.headers['user-agent']
      },
      params: formData,
      ctx
    })
    if (res.code === 200) {
      ctx.session.userInfo = {jwt: res.jwt}
    }
    ctx.body = res
    return
  },
  /**
   * 获取用户信息
   * @param  {obejct} ctx 上下文对象
   */
  async getUserInfo (ctx) {
    // console.log('getUserInfo', ctx.session.userInfo)
    let userInfo = await ProxyRequest.post({
      url: `${GlobalConfig.phpApi}/api/uc_get_user_info`,
      headers: {
        'Content-Type': ctx.headers['Content-Type'],
        'User-Agent': ctx.headers['user-agent'],
    //    'authorization': ctx.session.userInfo ? ctx.session.userInfo.jwt : ''
        'authorization':  ctx.headers['authorization'] ?  ctx.headers['authorization'] : ''
      },
      ctx
    })
    if (userInfo.code === 200) {
      ctx.session.userInfo = ctx.session.userInfo ? Object.assign(ctx.session.userInfo, userInfo.data.list) : userInfo.data.list
    } else {
      ctx.session.userInfo = null
    }
    ctx.body = Object.assign(userInfo, {code: 200})
    return
  },
  /**
   * 退出登录操作
   * @param  {obejct} ctx 上下文对象
   */
  async logout (ctx) {
    let formData = ctx.request.body
    if (ctx.session.userInfo) {
      let res = await ProxyRequest.post({
        url: `${GlobalConfig.phpApi}/api/uc_logout`,
        headers: {
          'Content-Type': ctx.headers['Content-Type'],
          'User-Agent': ctx.headers['user-agent'],
          // 'authorization': ctx.session.userInfo ? ctx.session.userInfo.jwt : ''
          'authorization':  ctx.headers['authorization'] ?  ctx.headers['authorization'] : ''
        },
        params: formData,
        ctx
      })
      if (res.code === 200) {
        // ctx.session.userInfo = null
        ctx.session = null
      }
      ctx.body = res
      return
    } else {
      ctx.body = {
        msg: '已退出登录，请不要重复操作',
        code: 200
      }
      return
    }
  },
  /**
   * 更新用户jwt
   * @param  {obejct} ctx 上下文对象
   */
  async updateUserInfoJwt (ctx) {
    // console.log(ctx.session.userInfo)
    let res = await ProxyRequest.post({
      url: `${GlobalConfig.phpApi}/api/get_access_token`,
      headers: {
        'Content-Type': ctx.headers['Content-Type'],
        'User-Agent': ctx.headers['user-agent'],
        // 'authorization': ctx.session.userInfo ? ctx.session.userInfo.jwt : ''
        'authorization':  ctx.headers['authorization'] ?  ctx.headers['authorization'] : ''
      },
      params: {access_token: ctx.session.userInfo.jwt || ''},
      ctx
    })
    if (res.code === 200) {
      ctx.session.userInfo = ctx.session.userInfo ? Object.assign(ctx.session.userInfo, {jwt: res.jwt}) : {jwt: res.jwt}
    }
    ctx.body = res
    return
  }
}
