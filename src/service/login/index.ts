import hyRequest from '@/utils/axios'

import { Account, DataType, LoginResult } from './types'

export function accountLoginRequest(account: Account) {
  return hyRequest.post<DataType<LoginResult>>({
    url: '/login',
    data: account
  })
}

export function requestUserInfo() {
  return hyRequest.get<DataType>({
    url: `/getUserInfo`,
    showLoading: false
  })
}

export function requestUserMenus() {
  return hyRequest.get<DataType>({
    url: `/getUserMenu`,
    showLoading: false
  })
}
