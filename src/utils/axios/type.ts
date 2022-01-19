import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYAxiosInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface HYAxiosRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: HYAxiosInterceptors<T>
  showLoading?: boolean
}
