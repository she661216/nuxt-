import request from '../plugins/axios'
import {clientStore} from '../store'
import {Message, MessageBox} from 'element-ui'
import {isBrowser, isCom} from '../utils/env'
import {tokenErroCode, baseURL} from '../config'
import {getLocalStore,removeLocalStore} from '../utils/storeUtils'
import qs from 'qs'

class Http {
  constructor (baseUrl = `/api/`, base_URL = baseURL) {
    this.baseUrl = baseUrl
    this.baseURL = base_URL
  }

  post (url, params, isLoading, isShowMsg) {
    return this.server('post', url, params, isLoading, isShowMsg)
  }

  get (url, params, isLoading, isShowMsg) {
    return this.server('get', url, params, isLoading, isShowMsg)
  }

  delete (url, params, isLoading, isShowMsg) {
    return this.server('delete', url, params, isLoading, isShowMsg)
  }

  patch (url, params, isLoading, isShowMsg) {
    return this.server('patch', url, params, isLoading, isShowMsg)
  }

  put (url, params, isLoading, isShowMsg) {
    return this.server('put', url, params, isLoading, isShowMsg)
  }

   server (method, url, params, isLoading, isShowMsg) {
    // !isCom && console.log(this.baseURL + this.baseUrl + url)
    // !isCom && console.log(params)
    isLoading && clientStore.commit('SET_LOADING_NUM', isLoading)
    let option = {
      url: this.baseURL + this.baseUrl + url,
      method
    }
    if (method === 'post') {
      option.data = qs.stringify(params)
    } else {
      option.params = params
    }
    return request(option).then(res => {  
     
      // !isCom && console.log(url + '------>' + JSON.stringify(res))
      if (isShowMsg && isBrowser && res.msg && ![401, ...tokenErroCode].includes(parseInt(res.code)) && res.msg != 'SUCCESS') {
       if (res.msg.indexOf('100012')>=0|| res.msg.indexOf('100011')>=0|| res.msg.indexOf('100014')>=0|| res.msg.indexOf('100018')>=0){
          removeLocalStore('Authorization')
          removeLocalStore('AuthUserInfo')
        Message({
          message: '登录已失效，请重新登录！',
          type: 'error',
          duration:1500
        })
      }else{
        Message({
          message: res.msg,
          type: res.code == '200' ? 'success' : 'error',
          duration: 2000
        })
      }      
      }      

      if (isBrowser && isShowMsg && tokenErroCode.includes(parseInt(res.code))) {
        removeLocalStore('Authorization')
        removeLocalStore('AuthUserInfo')
        location.href = '/user/login?from=' + encodeURIComponent(location.pathname + location.search)
        Message({
          message: '登录已失效，请重新登录！',
          type: 'error',
          duration:1500
        })
        // MessageBox.confirm(
        //   res.msg,
        //   // '未检测到登录账号，请先登录！',
        //   '提示',
        //   {
        //     confirmButtonText: '登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(async () => {
        //   location.href = '/user/login?from=' + encodeURIComponent(location.pathname + location.search)
        // }).catch(() => {

        // })
      }
      if (isBrowser && res.code === 401) {
        removeLocalStore('Authorization')
        removeLocalStore('AuthUserInfo')
        location.href = '/user/login?from=' + encodeURIComponent(location.pathname + location.search)
        Message({
          message: '登录已失效，请重新登录！',
          type: 'error',
          duration:1500
        })
        // MessageBox.confirm(
        //   res.msg,
        //   '提示',
        //   {
        //     confirmButtonText: '登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }
        // ).then(async () => {
        //   location.href = '/user/login?from=' + encodeURIComponent(location.pathname + location.search)
        // }).catch(() => {

        // })
      }
      isLoading && clientStore.commit('SET_LOADING_NUM', false)
      return res.code == '200' ? res : Object.assign(res, {data: null})
    }).catch(error => {
      isLoading && clientStore.commit('SET_LOADING_NUM', false)
      !isCom && console.log(error)
      return {
        code: error.response ? error.response.status : 500,
        statusCode: error.response ? error.response.status : 500,
        msg: error.message,
        data: null
      }
    })
  }
}

export default Http
