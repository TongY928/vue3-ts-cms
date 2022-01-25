export interface Role {
  roleId: number
  roleName: string
}
export interface Info {
  id: number
  name: string
  phoneNumber: string
}
import { Menu } from '@/service/login/types'
export interface LoginState {
  token: string
  userInfo: Info
  userMenu: Menu[]
  role: Role
}
