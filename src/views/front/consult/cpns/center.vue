<script lang="ts" setup>

import { ref } from 'vue';

const cycles = ref([
    new URL("../../../../assets/image/consult/cycle6.jpg", import.meta.url).href,
    new URL("../../../../assets/image/consult/cycle1.jpg", import.meta.url).href,
    new URL("../../../../assets/image/consult/cycle2.jpg", import.meta.url).href,
    new URL("../../../../assets/image/consult/cycle3.jpg", import.meta.url).href,
    new URL("../../../../assets/image/consult/cycle4.jpg", import.meta.url).href,
    new URL("../../../../assets/image/consult/cycle5.jpg", import.meta.url).href,

])

</script>
<template>
    <div class="main">
        <el-carousel autoplay motion-blur class="carousel" trigger="click">
            <el-carousel-item v-for="(item, index) in cycles" :key="index" class="carousel-item">
                <v-lazy-image :src=item alt="" class="image" />
            </el-carousel-item>
        </el-carousel>
        <div class="text1">Environment Protect</div>
        <div class="text2">Need You</div>
    </div>
</template>
<style lang="less" scoped>
:global{
    @keyframes moveup {
        from{
            margin-top: 5vw;
            opacity: 0;
        }
        to{
            margin-top: 0;
            opacity: 0.9;
        }
    }
}
.main {
    position: relative;
    width: 100vw;

    &:hover {
        .image {
            transform: scale(1.1);
        }
    }

    .carousel {
        position: absolute;
        width: 100vw;
        height: 30vw;

        .carousel-item {
            height: 30vw;

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.6s;
            }
        }

    }

    .text1 {
        position: absolute;
        top: 8vw;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        font-size: 3.8vw;
        font-weight: 600;
        color: #fff;
        opacity: 0.9;
        animation: moveup 1s;
    }

    .text2 {
        position: absolute;
        top: 15vw;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        font-size: 3.8vw;
        font-weight: 600;
        color: #fff;
        opacity: 0.9;
        animation: moveup 1s;
    }
}
</style>