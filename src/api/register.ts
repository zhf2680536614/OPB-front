import request from '@/utils/request'
export const userRegisterCaptchaValidatorService = (key: string, captcha: string) => {
    return request.get(
        `/user/captcha/validator?key=${key}&captcha=${captcha}`
    )
}