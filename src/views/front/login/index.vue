<script lang="ts" setup>
import { ref, watch } from 'vue'
import UserLogin from './userLogin/index.vue'
import ManageLogin from './manageLogin/index.vue'
import type { Login } from '@/type/login'
import { ElMessage, type FormRules } from 'element-plus'
import { userLogin } from '@/api/login'

const loading = ref(false)

const show = ref(true)

const changeShow = (obj: boolean) => {
    show.value = obj
}

watch(show, () => {
    loginData.value.username = ''
    loginData.value.password = ''
})

const loginData = ref<Login>(
    {
        username: '',
        password: ''
    }
)

const rules = ref<FormRules<Login>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 6, max: 18, message: '用户名长度在 6 - 18 之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 18, message: '密码长度在 6 - 18 之间', trigger: 'blur' },
    ],
})

const updateUsername = (username: string) => {
    loginData.value.username = username
}

const updatePassword = (password: string) => {
    loginData.value.password = password
}

const userLoginRef = ref<InstanceType<typeof UserLogin>>()
const manageLoginRef = ref<InstanceType<typeof ManageLogin>>()


const login = async (obj: string) => {
    if (obj === 'user') {

        const isValid = await userLoginRef.value?.validate();
        if (isValid) {
            loading.value = true
            const res = await userLogin(loginData.value)
            ElMessage.success("登陆成功")
            console.log(res);
            loading.value = false
        }


    } else if (obj === 'manage') {
        const isValid = await manageLoginRef.value?.validate();
        if (isValid) {
            loading.value = true
            const res = await userLogin(loginData.value)
            ElMessage.success("登陆成功")
            console.log(res);
            loading.value = false
        }
    }
}

</script>
<template>
    <div class="wrapper" v-loading="loading">
        <img src="../../../assets/vue.svg" class="logo wrapper" alt="">
        <h3 class="text_h3">【ATEY · 环境保护系统】</h3>
        <h4 class="text_h4">绿色农产汇聚处，健康生活新起点</h4>
        <div class="login_register wrapper">

            <user-login ref="userLoginRef" v-show="show" :show="show" @change-show="changeShow" :loginData="loginData"
                :rules="rules" @update-username="updateUsername" @update-password="updatePassword"
                @user-login="login" />

            <manage-login ref="manageLoginRef" v-show="!show" :show="show" @change-show="changeShow"
                :loginData="loginData" :rules="rules" @update-username="updateUsername"
                @update-password="updatePassword" @manage-login="login" />

        </div>
    </div>
</template>
<style scoped lang="less">
.wrapper {
    margin-top: 2vw;
    width: 80vw;
    text-align: center;

    h3 {
        font-size: 2.5vw;
    }

    h4 {
        font-size: 1.5vw;
        margin-top: 1vw;
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
</style>