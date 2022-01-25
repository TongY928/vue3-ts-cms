export interface Account {
  username: string
  password: string
}
import { Role } from '@/store/login/types'

export interface Menu {
  id: string
  path: string
  name: string
  type: number
  children: any[]
}

export interface LoginResult {
  id: number
  token: string
  role: Role
}

export interface DataType<T = any> {
  code: number
  data: T
  message: string
}
