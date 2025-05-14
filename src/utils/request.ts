import axios, { type AxiosResponse } from 'axios'
import BaseUrl from '../config/service'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/type/ApiResponse'
import { loaclCache } from '@/utils/cache'
import { Authentication, Token } from '@/config/constants/Token'

const instance = axios.create({
    baseURL: BaseUrl,
    timeout: 5000
}
)

instance.interceptors.request.use(
    (config) => {
        //携带token

        const requestUrl = config.url || ''//请求的Url

        if (requestUrl.includes('/user/')) {
            const authentication = loaclCache.getCache(Authentication)
            if (config.headers && authentication) {
                config.headers!.Authentication = authentication
            }
        }
        if (requestUrl.includes('/manage/')) {
            const token = loaclCache.getCache(Token)
            if (config.headers && Token) {
                config.headers!.Token = token
            }
        }

        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)



instance.interceptors.response.use(
    (res: AxiosResponse<ApiResponse>) => {
        if (res.data.code === 0) {
            ElMessage.error(res.data.msg)
        }
        return res
    },
    (error) => {
        return error
    }
)

export default instance