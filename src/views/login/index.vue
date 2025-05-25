<script setup>
import { ref, watch } from 'vue'
import UserLogin from './userLogin/index.vue'
import ManageLogin from './manageLogin/index.vue'
import { ElMessage,} from 'element-plus'
import { userLoginService, manageLoginService } from '@/api/login'
import { loaclCache } from '@/utils/cache'
import { Authentication, Token } from '@/config/constants/Token'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)

const show = ref(true)

const changeShow = (obj) => {
    show.value = obj
}

watch(show, () => {
    loginData.value.username = ''
    loginData.value.password = ''
})

const loginData = ref(
    {
        username: '',
        password: ''
    }
)

const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 6, max: 18, message: '用户名长度在 6 - 18 之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '密码长度在 6 - 18 之间', trigger: 'blur' },
    ],
})

const updateUsername = (username) => {
    loginData.value.username = username
}

const updatePassword = (password) => {
    loginData.value.password = password
}

const userLoginRef = ref()
const manageLoginRef = ref()


const login = async (obj) => {
    if (obj === 'user') {

        const isValid = await userLoginRef.value?.validate();
        if (isValid) {
            loading.value = true
            const res = await userLoginService(loginData.value)
            if (res.data.code === 1) {
                ElMessage.success("登陆成功")
                loaclCache.setCache(Authentication, res.data.data.authentication)
                router.push('/')
            }
            loading.value = false
        }


    } else if (obj === 'manage') {
        const isValid = await manageLoginRef.value?.validate();
        if (isValid) {
            loading.value = true
            const res = await manageLoginService(loginData.value)
            if (res.data.code === 1) {
                ElMessage.success("登陆成功")
                loaclCache.setCache(Token, res.data.data.token)
                router.push('/admin/article')
            }
            loading.value = false
        }
    }
}

</script>
<template>
    <div class="bgc">
        <div class="wrapper" v-loading="loading">
            <img src="../../assets/vue.svg" class="logo wrapper" alt="">
            <h3 class="text_h3">Green Pluse · 环境保护系统
                <div class="text_h4">
                    Let the gentle breeze of green blow through the land
                </div>
            </h3>
            <div class="login_register wrapper">

                <user-login ref="userLoginRef" v-show="show" :show="show" @change-show="changeShow"
                    :loginData="loginData" :rules="rules" @update-username="updateUsername"
                    @update-password="updatePassword" @user-login="login" />

                <manage-login ref="manageLoginRef" v-show="!show" :show="show" @change-show="changeShow"
                    :loginData="loginData" :rules="rules" @update-username="updateUsername"
                    @update-password="updatePassword" @manage-login="login" />

            </div>
        </div>
    </div>

</template>
<style scoped lang="less">
:global {
    @keyframes fontmove {
        from {
            margin-top: 1vw;
            opacity: 0;
        }

        to {
            margin-top: 0;
            opacity: 1;
        }
    }
}

.bgc {
    .wrapper {
        margin-top: 1.5vw;
        width: 80vw;
        text-align: center;

        .text_h3 {
            font-size: 2.5vw;
            line-height: 3vw;
            animation: fontmove 1.2s;

            .text_h4 {
                font-size: 1vw;
                font-weight: 300;
                line-height: 3vw;
                animation: fontmove 1.2s;
            }
        }


        .logo {
            width: 5vw;
            height: 5vw;
        }

        .login_register {
            width: 40vw;
            height: 35vw;
            transition: all 1s;
        }
    }
}
</style>