import axios, { type AxiosResponse } from 'axios'
import BaseUrl from '../config/service'
import { ElMessage } from 'element-plus'
import type { ApiResponse } from '@/type/ApiResponse'
import { loaclCache } from '@/utils/cache'
import { Authentication, Token } from '@/config/constants/Token'
import router from '@/router'

const instance = axios.create({
    baseURL: BaseUrl,
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        try {
            const requestUrl = config.url || ''

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

            return config
        } catch (error) {
            ElMessage.error('请求配置错误')
            router.push('/404')
            return Promise.reject(error)
        }
    },
    (error) => {
        ElMessage.error('请求发送失败')
        router.push('/404')
        return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (res: AxiosResponse<ApiResponse>) => {
        try {
            if (res.data.code === 0) {
                ElMessage.error(res.data.msg)
                return res
            }
            return res
        } catch (error) {
            ElMessage.error('响应数据处理错误')
            router.push('/404')
            return Promise.reject(error)
        }
    },
    (error) => {
        // 处理不同类型的错误
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    ElMessage.error('请求的资源不存在')
                    break
                case 500:
                    ElMessage.error('服务器内部错误')
                    break
                default:
                    ElMessage.error('请求失败')
            }
        } else if (error.request) {
            ElMessage.error('网络请求超时')
        } else {
            ElMessage.error('请求配置错误')
        }
        
        // 跳转到404页面
        router.push('/404')
        return Promise.reject(error)
    }
)

export default instance