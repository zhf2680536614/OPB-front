<script lang="ts" setup>
</script>
<template>

    <div class="top-container">
        <div class="left">
            <router-link to="/front/consult" active-class="active">环境资讯</router-link>
            <router-link to="/front/nature" active-class="active">自然风光</router-link>
            <router-link to="/front/action" active-class="active">采取行动</router-link>
            <router-link to="/front/about" active-class="active">关于我们</router-link>
        </div>
        <div class="center">
            Let the gentle breeze of green blow through the land
        </div>
        <div class="right">
            <router-link to="/login">Login</router-link>
        </div>
    </div>

</template>
<style lang="less" scoped>
.top-container {
    display: flex;
    justify-content: space-around;
    background-color: #050404;
    height: 2.5vw;
    line-height: 2.5vw;
    color: #ffffff;
    text-align: center;

    a {
        display: block;
        height: 2vw;
        font-size: 0.85vw;
        font-weight: 300;
        color: #ffffff;
        transition: all 0.2s;

        &:hover {
            border-bottom: 0.05vw solid #ffffff;
        }
    }

    .left {
        display: flex;
        justify-content: space-evenly;
        width: 33.3333vw;
    }

    .center {
        width: 33.3333vw;
        font-size: 0.9vw;
        font-weight: 500;
    }

    .right {
        width: 33.3333vw;
    }
}

.active{
    border-bottom: 0.05vw solid #ffffff;
}

</style>