import { createStore } from 'vuex'

import login from './login'

import { RootState } from './types'

const store = createStore<RootState>({
  state() {
    return {
      name: 'Ami',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
