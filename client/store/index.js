import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import console from './modules/console'
import user from './modules/user'

Vue.use(Vuex)

export const clientStore = new Vuex.Store({
  actions: {
    async nuxtServerInit ({dispatch, commit}, {req, res, params, route}) {
      await dispatch('getNewsMenuAction')
      await dispatch('getShemeMenuAction')
      await dispatch('getServiceMenuAction', {keywords: ''})
      await dispatch('getContactUsAction')
      await dispatch('getTalentMenuAction')
      //把session用户信息存在store
       commit('SET_USER', req.session && req.session.userInfo ? req.session.userInfo : null)
 
      // return Promise.all(initAppData)

      // const initAppData = [
      //   await dispatch('getNewsMenuAction'),
      //   await dispatch('getShemeMenuAction'),
      //   await dispatch('getServiceMenuAction', {keywords: ''}),
      //   await dispatch('getContactUsAction')
      // ]
      // initAppData.push(commit('SET_USER', req.session && req.session.userInfo ? req.session.userInfo : null))
      // return Promise.all(initAppData)
    }
  },
  modules: {
    common,
    console,
    user
  }
})

const store = () => clientStore

export default store
