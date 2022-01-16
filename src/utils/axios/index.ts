import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { BASE_URL, TIME_OUT } from './config'
import { HYAxiosInterceptors, HYAxiosRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const defaultLoading = false

class HYAxios {
  instance: AxiosInstance
  interceptors?: HYAxiosInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: HYAxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.showLoading = config.showLoading || defaultLoading

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...'
          })
        }
        return config
      },
      (err) => {
        console.log('请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        // 判断状态码和错误信息
        return err
      }
    )
  }

  request<T>(config: HYAxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      // 针对请求的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
          return err
        })
        .finally(() => {
          this.showLoading = defaultLoading
        })
    })
  }
  get<T>(config: HYAxiosRequestConfig): Promise<T> {
    config = Object.assign(config, {
      method: 'get'
    })
    return this.request(config)
  }
  post<T>(config: HYAxiosRequestConfig): Promise<T> {
    config = Object.assign(config, {
      method: 'post'
    })
    return this.request(config)
  }
  delete<T>(config: HYAxiosRequestConfig): Promise<T> {
    config = Object.assign(config, {
      method: 'delete'
    })
    return this.request(config)
  }
  patch<T>(config: HYAxiosRequestConfig): Promise<T> {
    config = Object.assign(config, {
      method: 'patch'
    })
    return this.request(config)
  }
}

const http = new HYAxios({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default http
