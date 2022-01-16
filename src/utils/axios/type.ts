import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYAxiosInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface HYAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: HYAxiosInterceptors
  showLoading?: boolean
}
