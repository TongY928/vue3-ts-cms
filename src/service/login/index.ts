import hyRequest from '@/utils/axios'

import { Account, DataType, LoginResult, Menu } from './types'

export function accountLoginRequest(account: Account) {
  return hyRequest.post<DataType<LoginResult>>({
    url: '/login',
    data: account
  })
}

export function requestUserInfo(id: number) {
  return hyRequest.get<DataType>({
    url: `/getUserInfo`,
    showLoading: false,
    params: {
      id
    }
  })
}

export function requestUserMenus(roleId: number) {
  return hyRequest.get<DataType<Menu[]>>({
    url: `/getUserMenus`,
    showLoading: false,
    params: {
      id: roleId
    }
  })
}
