import request from '@/utils/request'
import type { Login } from '@/types/index'

export const userLoginService = (obj: Login) => {
    return request.post("/user/login", obj)
}

export const manageLoginService = (obj: Login) => {
    return request.post("/manage/login", obj)
}