import axios from 'axios'
import {isBrowser, isCom} from '../utils/env'
import {getLocalStore,removeLocalStore} from '../utils/storeUtils'
import {clientStore} from '../store'
// 创建axios实例
const service = axios.create({
  // baseURL: '/', // api 的 base_url
  timeout: 30000 // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(
  config => {
    if (isBrowser) {
      getLocalStore('Authorization') && (config.headers.common['authorization'] = getLocalStore('Authorization'))
      if (config.url.indexOf('uc_') > 0) {
     //   getLocalStore('Authorization') && (config.headers.common['authorization'] = getLocalStore('Authorization'))
      //  config.headers.common['authorization'] = clientStore.state.user.userInfo.jwt
        !isCom && console.log(config.url + '===> ' + config.headers.common['authorization'])
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // if(response.data.msg){
    //   if(response.data.msg.indexOf('100012')  || response.data.msg.indexOf('100011')|| response.data.msg.indexOf('100018')){
    //      removeLocalStore('Authorization')
    //      removeLocalStore('AuthUserInfo')
    //     //  response.data = {
    //     //    code:401,
    //     //    msg:'未检测到登录账号，请先登录！'
    //     //  }
    //   }
    // }
    
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
