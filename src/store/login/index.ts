import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenus
} from '@/service/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { Account } from '@/service/login/types'
import { LoginState, Role } from './types'
import { RootState } from '../types'
import { registerMenus } from '@/utils/map-menus'
const loginModle: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      role: {
        roleId: -1,
        roleName: '未登录'
      },
      userInfo: {
        id: -1,
        name: '未登录',
        phoneNumber: '---'
      },
      userMenu: []
    }
  },
  getters: {
    menus: (state) => state.userMenu,
    info: (state) => state.userInfo,
    role: (state) => state.role
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
      registerMenus(userMenus)
    },
    changeRole(state, role: Role) {
      state.role = role
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: Account) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code == -1) {
        return
      }
      const { id, token, role } = loginResult.data
      commit('changeToken', token)
      commit('changeRole', role)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfo(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenus(role.roleId)
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
