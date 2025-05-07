import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref('')
        //设置token
        const setToken = (t: string) => { token.value = t }
        return { token, setToken }
    },
    //设置持久化
    {
        persist: true
    }
)