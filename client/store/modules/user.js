import {apiGetUserInfo, apiGetToken} from '../../api/phpApi'
import {setSessionStore, getSessionStore, getLocalStore, setLocalStore} from '../../utils/storeUtils'
import {isBrowser} from '../../utils/env'

// let localUserInfo = isBrowser ? getLocalStore('userInfo') ? JSON.parse(getLocalStore('userInfo')) : {uid: ''} : {uid: ''}
export default {
  state: {
    userInfo: {
      avatar: '/images/icon_avatar.png',
      nickname: '',
      username: '',
      uid: ''
    }
  },
  mutations: {
    SET_USER (state, userInfo) {
      let initUser = userInfo ? Object.assign(state.userInfo, userInfo) : {
        avatar: '/images/icon_avatar.png',
        nickname: '',
        username: '',
        uid: ''
      }
      !initUser.avatar && (initUser.avatar = '/images/icon_avatar.png')
      state.userInfo = initUser
    }
  },
  actions: {
    getUserInfoAction ({commit}) {
      // return apiGetUserInfo({}, false, false).then(res => {
      //   commit('SET_USER', res && res.data ? res.data.list : null)
      //   isBrowser && setLocalStore('userInfo', res && res.data ? JSON.stringify(res.data.list) : null)
      //   return res && res.data ? true : false
      // })
    },
    // getJwtAction () {
    //   return getLocalStore('Authorization') ? apiGetToken({access_token: getLocalStore('Authorization')}, false, false).then(res => {
    //     res.code === 200 && setLocalStore('Authorization', res.jwt)
    //   }) : false
    // }
    // getJwtAction ({commit, state}) {
    //   setTimeout(async _ => {
    //     if (state.userInfo.jwt) {
    //       const {apiUpdateUserInfoJwt} = await import('../../api/nodeApi')
    //       apiUpdateUserInfoJwt({access_token: state.userInfo.jwt}, false, false).then(res => {
    //         if (res.code === 200) {
    //           commit('SET_USER', {jwt: res.jwt})
    //         }
    //         // res.code === 200 && setLocalStore('Authorization', res.jwt)
    //       })
    //     }
    //     return false
    //   })
    // }

  }
}
