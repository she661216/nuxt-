/**
 * 用户业务操作
 */

const validator = require('validator')

const user = {
  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = '用户名格式为6-16位的小写字母，包括-、_'
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = '请输入正确的邮箱地址'
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = '密码长度应该为6-16'
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = '两次密码不一致'
      return result
    }

    result.success = true

    return result
  }

}

module.exports = user
