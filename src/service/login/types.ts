export interface Account {
  username: string
  password: string
}

export interface LoginResult {
  id: number
  name: string
  token: string
}

export interface DataType<T = any> {
  code: number
  data: T
}
