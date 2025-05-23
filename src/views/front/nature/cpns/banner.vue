<script setup>
import {ref} from 'vue'
const image = ref(new URL('../../../../assets/image/nature/nature1.jpg',import.meta.url).href)
</script>
<template>

    <div class="main">
        <div class="image">
            <v-lazy-image :src="image" alt="" />
        </div>
        <div class="text1">
            Explore Nature's Masterpiece
        </div>
        <div class="text2">
            探索自然的杰作
        </div>
        <div class="button">
            Share Scenery <el-icon class="icon"><Right /></el-icon>
        </div>
    </div>

</template>
<style lang="less" scoped>
:global {
    @keyframes moveup {
        from {
            margin-top: 5vw;
            opacity: 0;
        }

        to {
            margin-top: 0;
            opacity: 0.9;
        }
    }
}

.main {
    position: relative;
    width: 100vw;
    height: 30vw;

    &:hover {
        img {
            transform: scale(1.1);
        }
    }

    .image {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            object-fit: cover;
            transition: all 0.6s;
        }
    }

    .text1,
    .text2 {
        position: absolute;
        left: 50%;
        width: 100%;
        text-align: center;
        transform: translateX(-50%);
        z-index: 10;
        font-size: 3.8vw;
        font-weight: 600;
        color: #fff;
        opacity: 0.9;
        animation: moveup 1s;
    }

    .text1 {
        top: 6vw;
    }

    .text2 {
        top: 13vw;
        font-size: 2.8vw;
        font-weight: 500;
    }

    .button{
        position: absolute;
        left: 50%;
        top: 20vw;
        width: 12vw;
        height: 3vw;
        border-radius: 1.3vw;
        background-color: #fff;
        text-align: center;
        line-height: 3vw;
        color: #4e4e4e;
        font-size: 1.2vw;
        font-weight: 600;
        transform: translateX(-50%);
        transition: all 0.3s;
        cursor: pointer;
        animation: moveup 1s;

        .icon{
            vertical-align: middle;
        }

        &:hover{
            transform: translateX(-50%) scale(1.1);
            opacity: 0.8;
        }
    }
}
</style>