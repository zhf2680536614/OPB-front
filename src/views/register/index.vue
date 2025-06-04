<script setup lang="ts">
import '@/assets/style/global/wrapper.css'
import { ref } from 'vue'
import { userRegisterCaptchaValidatorService } from '@/api/register'
import { ElMessage } from 'element-plus'

var key = crypto.randomUUID()
const captchaShow = ref(false)
const captchaImage = ref(`http://localhost:18080/api/user/captcha?key=${key}`)
const captchaInput = ref('')

const flushImage = () => {
    captchaInput.value = ''
    key = crypto.randomUUID()
    captchaImage.value = `http://localhost:18080/api/user/captcha?key=${key}`
}

const captchaVilidator = async () => {
    const res = await userRegisterCaptchaValidatorService(key, captchaInput.value)
    if (res.data.data) {
        ElMessage.success('验证成功,注册功能还未实现')
    } else {
        ElMessage.error("验证码错误，请重新输入")
        flushImage()
    }
}

const register = () => {
    captchaShow.value = true
}
</script>
<template>
    <div class="container-top">
        <img class="logo" src="../../assets/vue.svg" alt="">
        <div class="text">用户注册</div>
    </div>
    <div class="container-main wrapper">
        <el-icon class="user-icon">
            <User />
        </el-icon>
        <el-form class="form">
            <div class="text">账号</div>
            <el-form-item>
                <el-input placeholder="请输入账号"></el-input>
            </el-form-item>
            <div class="text">邮箱</div>
            <el-form-item>
                <el-input placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <div class="text">电话号码</div>
            <el-form-item>
                <el-input placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <div class="text">密码</div>
            <el-form-item>
                <el-input placeholder="请输入密码"></el-input>
            </el-form-item>
            <div class="text">确认密码</div>
            <el-form-item>
                <el-input placeholder="请输入确认密码"></el-input>
            </el-form-item>
        </el-form>
        <router-link to="/login">已有账号？登录</router-link>
        <el-button class="button" type="primary" @click="register">Regsiter</el-button>
    </div>

    <el-dialog v-model="captchaShow" class="dialog" title="请先进行验证" width="29vw">
        <img :src="captchaImage" alt="验证码" @click="flushImage" />
        <div>看不清楚？点击图片刷新</div>
        <el-input placeholder="请输入验证码" class="input" v-model="captchaInput"></el-input>
        <el-button class="button" type="primary" @click="captchaVilidator">验证</el-button>
    </el-dialog>
</template>
<style lang="less" scoped>
:global {
    @keyframes textmove {
        from {
            opacity: 0.1;
            line-height: 12vw;
        }

        to {
            opacity: 1;
            line-height: 10vw;
        }
    }

    @keyframes logoshow {
        from {
            opacity: 0.1;
        }

        to {
            opacity: 1;
        }
    }
}

.container-top {
    display: flex;
    height: 10vw;
    background-color: #fff;
    box-shadow: 0 0 0.5vw 0.5vw rgba(169, 166, 166, 0.5);

    .logo {
        display: block;
        margin-left: 3vw;
        width: 10vw;
        height: 10vw;
        animation: logoshow 1.2s;
    }

    .text {
        margin-left: 3vw;
        font-size: 2vw;
        font-weight: 200;
        line-height: 10vw;
        animation: textmove 1.2s;
    }
}

.container-main {
    margin-top: 2vw;
    width: 30vw;
    text-align: center;

    .user-icon {
        margin-bottom: 3vw;
        font-size: 4vw;
        color: rgb(18, 152, 255);
    }

    .form {
        .text {
            text-align: left;
            margin-bottom: 0.3vw;
            font-weight: 300;
        }

        .el-input {
            height: 2.5vw;
        }
    }

    a {
        display: block;
        text-align: right;
        transition: all 0.3s;
        font-size: 0.9vw;

        &:hover {
            color: #015f87;
        }
    }

    .button {
        margin-top: 1vw;
        width: 30vw;
        font-size: 1.1vw;
    }
}

.dialog {
    .input {
        width: 26vw;
        height: 3vw;
    }

    img {
        width: 26vw;
        height: 8vw;
    }

    div {
        margin-right: 1vw;
        text-align: right;
        line-height: 2vw;
        color: #9a9a9a;
        font-size: 0.8vw;
    }

    .button {
        margin-top: 1vw;
        width: 26vw;
        font-size: 0.8vw;
    }
}
</style>