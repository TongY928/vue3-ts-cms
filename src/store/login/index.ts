import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenus
} from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { Account } from '@/service/login/types'
import { LoginState } from './types'
import { RootState } from '../types'

const loginModle: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  getters: {
    menus: (state) => state.userMenu,
    info: (state) => state.userInfo
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenu = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: Account) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code == -1) {
        return
      } else {
        router.push('/main')
        return
      }
      const { token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfo()
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenus()
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModle
