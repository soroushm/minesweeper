import { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { createRequest } from './request'
import { BASE_URL } from '../../config.ts'

interface Option {
  baseURL?: string
}

export interface RequestConfig extends AxiosRequestConfig {
  [key: string]: any
}

interface Args {
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

  rest = (config: RequestConfig): Promise<any> | undefined => {
    return this.fetch?.request({
      ...config,
    })
  }

  call = ({ transformResult = async (data: any) => data, ...args }: Args) => {
    if (this.fetch) {
      return this.fetch(args)
        .then(transformResult)
        .then((res) => res.data)
    }
  }

  create(option: Option = {}): void {
    this.fetch = createRequest(option)
  }
}

export default new Client({
  baseURL: BASE_URL,
})
