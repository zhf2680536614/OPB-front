import axios from 'axios'
import BaseUrl from '../config/service';

const instance = axios.create({
    baseURL: BaseUrl,
    timeout: 5000
}
)

instance.interceptors.request.use(
    (config) => {
        //携带token
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        return error
    }
)