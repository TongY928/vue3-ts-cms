import hyRequest from '@/utils/axios'

import { Account, DataType, LoginResult } from './types'

export function accountLoginRequest(account: Account) {
  return hyRequest.post<DataType<LoginResult>>({
    url: '/login',
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<DataType>({
    url: `/user/${id}`,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<DataType>({
    url: `/role/${id}/menu`,
    showLoading: false
  })
}
