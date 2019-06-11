/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userInfoController = require('../../controllers/user-info')

const routers = router
  .post('/user/login', userInfoController.login)
  .post('/user/register', userInfoController.register)
  .post('/user/logout', userInfoController.logout)
  .post('/user/getUserInfo', userInfoController.getUserInfo)
  .post('/user/updateUserInfoJwt', userInfoController.updateUserInfoJwt)

module.exports = routers
