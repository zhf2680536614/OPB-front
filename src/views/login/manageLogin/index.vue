<script lang="ts" setup>
import { ref, watch } from 'vue'
import '@/assets/style/global/wrapper.css'

const props = defineProps({
    show: Boolean,
    loginData: Object,
    rules: Object
})

const manageFormRef = ref()

// 定义暴露的类型
interface LoginFormExposed {
    validate: () => Promise<boolean>
}

// 添加类型断言
defineExpose<LoginFormExposed>({
    validate: async () => {
        return new Promise((resolve) => {
            manageFormRef.value?.validate((valid: any) => resolve(valid));
        });
    }
});

//通过defineEmits编译器宏生成emit方法
const emit = defineEmits(['changeShow', 'updateUsername', 'updatePassword', 'manageLogin'])

const showButton = () => {
    emit('changeShow', !props.show)
}

const username = ref('')

const password = ref('')

watch(username, (newUsername) => {
    emit('updateUsername', newUsername)
})

watch(password, (newPassword) => {
    emit('updatePassword', newPassword)
})

//管理员登录
const manageLogin = () => {
    emit('manageLogin', 'manage')
}

</script>
<template>
    <div class="login">
        <div class="login_right">
            <img class="login_top" src="../../../assets/image/login/left.jpg">
            <div class="login_bottom" @click="showButton">
                用户登录
            </div>
        </div>
        <div class="login_left">
            <h3 class="text_one">
                管理员登录
            </h3>
            <el-form ref="manageFormRef" class="form" :rules="rules" :model="loginData">
                <div class="prop">账号</div>
                <el-form-item prop="username">
                    <el-input v-model="username" placeholder="请输入账号" clearable />
                </el-form-item>
                <div class="prop">密码</div>
                <el-form-item prop="password">
                    <el-input v-model="password" placeholder="请输入密码" type="password" show-password clearable />
                </el-form-item>
            </el-form>
            <el-button class="button" type="primary" @click="manageLogin">Login</el-button>
            <h3 class="text_two"><router-link to="/register">没有账号？注册一个</router-link> | <router-link
                    to="">忘记密码</router-link></h3>
        </div>
    </div>

</template>
<style scoped lang="less">
:global {
    @keyframes change {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}

.login {
    display: flex;
    width: 100%;
    height: 35vw;
    animation: change 0.6s;

    .login_left {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 24.5vw;
        height: 35vw;
        background-image: linear-gradient(to left,
                #88ccff,
                #bde8ff);
        border-radius: 2%;

        .text_one {
            font-weight: 600;
            font-size: 2vw;
        }

        .form {
            width: 20vw;
            text-align: left;

            .prop {
                margin-bottom: 0.5vw;
            }

            .el-input {
                width: 20vw;
                height: 2.5vw;
            }
        }

        .button {
            width: 20vw;
            height: 2.5vw;
            font-size: 1.2vw;
        }

        .text_two {
            font-size: 0.9vw;

            a {
                transition: all 0.3s;

                &:hover {
                    color: #015f87;
                }
            }
        }
    }

    .login_right {
        margin-right: 1vw;
        width: 14.5vw;
        height: 35vw;
        border-radius: 2%;

        .login_top {
            height: 29.5vw;
            border-radius: 0.3vw;
        }

        .login_bottom {
            margin-top: 1vw;
            height: 4.5vw;
            line-height: 4.5vw;
            background-image: linear-gradient(to left,
                    #88ccff,
                    #bde8ff);
            border-radius: 0.3vw;
            font-size: 1.2vw;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3;

            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>