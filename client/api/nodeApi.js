import Http from './HttpClass'
import {nodeApi} from '../config'

let _http = new Http('/font/api/', nodeApi)

export const apiLogin = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('user/login', params, isLoading, isShowMsg)
}

export const apiGetUserInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('user/getUserInfo', params, isLoading, isShowMsg)
}

export const apiLogout = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('user/logout', params, isLoading, isShowMsg)
}

export const apiRegister = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('user/register', params, isLoading, isShowMsg)
}

export const apiUpdateUserInfoJwt = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('user/updateUserInfoJwt', params, isLoading, isShowMsg)
}
