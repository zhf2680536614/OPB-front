import request from '@/utils/request'
import type { Login } from '@/types/login'

export const userLogin = (obj: Login) => {
    return request.post("/user/login", obj)
}

export const manageLogin = (obj: Login) => {
    return request.post("/manage/login", obj)
}