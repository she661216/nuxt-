import {setLocalStore, getLocalStore} from '../../utils/storeUtils'
import {isBrowser} from '../../utils/env'

export default {
  state: {
    isCollapse: false,
    isNotice: false,
    serviceListActive: false
  },
  mutations: {
    SET_ISCOLLAPSE (state, isCollapse) {
      state.isCollapse = isCollapse
      isBrowser && setLocalStore('isCollapse', isCollapse ? 1 : 0)
    },
    SET_IS_NOTICE (state, isNotice) {
      state.isNotice = isNotice
    },
    SET_SERVICE_LIST_ACTIVE (state, serviceListActive) {
      state.serviceListActive = serviceListActive
    }
  }
}
