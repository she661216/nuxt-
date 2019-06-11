import {apiServiceCategoryHot, apiSchemeMenu, apiContactUs, apiNewsList, apiGlobalSearch,apiTalentMenu} from '../../api/phpApi'
import {isBrowser} from '../../utils/env'
import {setLocalStore} from '../../utils/storeUtils'
import console from './console'

export default {
  state: {
    newsMenu: null,
    hotMenu: [],
    shemeMenu: [],
    headActive: false,
    contactUs: null,
    loadingNum: 0,
    dialogFeedbackVisible: false,
    isSidebar: false
  },
  mutations: {
    SET_HEADER_ACTIVE (state, headActive) {
      state.headActive = headActive
    },
    SET_NEWS_MENU (state, newsMenu) {
      state.newsMenu = newsMenu
    },
    SET_HOT_MENU (state, hotMenu) {
      state.hotMenu = hotMenu
    },
    SET_SHEME_MENU (state, shemeMenu) {
      state.shemeMenu = shemeMenu
    },
    SET_TALENT_MENU (state, talentMenu) {
      state.talentMenu = talentMenu
    },    
    SET_CONTACT_US (state, contactUs) {
      state.contactUs = contactUs
    },
    SET_LOADING_NUM (state, isLoading) {
      isLoading === 0 ? (state.loadingNum = 0) : isLoading ? ++state.loadingNum : state.loadingNum > 0 ? --state.loadingNum : (state.loadingNum = 0)
    },
    SET_FEEDBACK_VISIBLE (state, dialogFeedbackVisible) {
      state.dialogFeedbackVisible = dialogFeedbackVisible
    },
    SET_IS_SIDEBAR (state, isSidebar) {
      state.isSidebar = isSidebar
      isBrowser && setLocalStore('isSidebar', isSidebar ? 1 : 0)
    }
  },
  actions: {
    getNewsMenuAction ({commit}) {
      return apiNewsList().then(res => {
        commit('SET_NEWS_MENU', res && res.data ? res.data : null)
      })
    },
    getServiceMenuAction ({commit}, {keywords = '',req}) {
      return apiServiceCategoryHot({keywords}, true).then(res => {
        commit('SET_HOT_MENU', res && res.data ? res.data.list : [])
      })
    },
    getShemeMenuAction ({commit}) {
      return apiSchemeMenu({limit: 10000, page: 1}).then(res => {
        commit('SET_SHEME_MENU', res && res.data ? res.data.list : [])
      })
    },
    getTalentMenuAction ({commit}) {
      return apiTalentMenu({limit: 10000, page: 1}).then(res => {
        commit('SET_TALENT_MENU', res && res.data ? res.data : [])
      })
    },
    
    getContactUsAction ({commit}) {
      return apiContactUs().then(res => {
        commit('SET_CONTACT_US', res && res.data ? res.data : null)
      })
    }
  }
}
