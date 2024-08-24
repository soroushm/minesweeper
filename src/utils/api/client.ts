import { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { createRequest } from './request'
import { BASE_URL } from '../../config.ts'

interface Option {
  baseURL?: string
}

export interface RequestConfig extends AxiosRequestConfig {
  [key: string]: any
}

interface Args extends RequestConfig {
  transformResult?: (data: any) => Promise<any>
  [key: string]: any
}

export class Client {
  fetch: AxiosInstance | null = null

  constructor(option?: Option) {
    if (option) {
      this.create(option)
    }
  }

  rest = (config: RequestConfig): Promise<any> => {
    if (!this.fetch) {
      return Promise.reject(new Error('Fetch is not initialized'))
    }
    return this.fetch.request({
      ...config,
    })
  }

  call = async <TData>({
    transformResult = async (data: AxiosResponse<TData, any>): Promise<AxiosResponse<TData, any>> =>
      data,
    ...args
  }: Args): Promise<TData> => {
    if (!this.fetch) {
      throw new Error('Fetch is not initialized')
    }
    const response = await this.fetch<TData>(args)
    const result = await transformResult(response)
    return result.data
  }

  create(option: Option = {}): void {
    this.fetch = createRequest(option)
  }
}

export default new Client({
  baseURL: BASE_URL,
})
