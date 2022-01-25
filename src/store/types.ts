import { LoginState } from './login/types'
export interface RootState {
  name: string
  age: number
}

export interface Modules {
  login: LoginState
}
export type GStoreType = RootState & Modules
