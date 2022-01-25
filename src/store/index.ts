import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login'
import { RootState, GStoreType } from './types'

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
export function useStore(): Store<GStoreType> {
  return useVuexStore()
}
export default store
