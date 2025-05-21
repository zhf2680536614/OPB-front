<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const imgRef = ref()

const joinRef = ref()

const buttonRef = ref()

const handleScroll = () => {
    nextTick(() => {
        if (window.scrollY >= window.innerHeight * 1.1 && window.scrollY <= window.innerHeight * 2) {
            imgRef.value.style.width = '100vw'
        } else {
            imgRef.value.style.width = '92vw'
        }
        if (window.scrollY > window.innerHeight * 1.1 && window.scrollY < window.innerHeight * 1.2) {
            let moveLength = -(window.scrollY / window.innerWidth * 100) + 61.9
            joinRef.value.style.transform = `translateY(${moveLength}vw)`
            buttonRef.value.style.transform = `translateX(-50%) translateY(${moveLength}vw)`
        }
    })
}

onMounted(() => {
    nextTick(() => {
        window.addEventListener('scroll', handleScroll)
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div class="main">
        <div class="big_title">
            Connect with Environmental Groups
        </div>
        <div class="chinese_title">
            携手守护绿水青山，共筑生态家园，诚邀您加入环保行列
        </div>
        <div class="english_title">
            Join us to protect green mountains and clear waters, and build an ecological home together
        </div>
        <div class="image">
            <img ref="imgRef" src="../../../../assets/image/connect-group/connect3.jpg" alt="">
        </div>
        <div ref="joinRef" class="join">
            <div class="welcome">
                Welcome
            </div>
            <div class="Join">
                Join
            </div>
            <div class="Us">
                Us
            </div>
        </div>
        <div ref="buttonRef" class="button">
            Join In
        </div>
    </div>
</template>

<style lang="less" scoped>
.main {
    position: relative;
    width: 100vw;
    text-align: center;

    .big_title {
        position: absolute;
        width: 100vw;
        height: 3vw;
        line-height: 3vw;
        font-size: 2.2vw;
        font-weight: 500;
        color: rgba(51, 51, 51, 0.85);
    }

    .chinese_title {
        position: absolute;
        top: 4vw;
        width: 100vw;
        font-size: 1.2vw;
        color: rgba(51, 51, 51, 0.9);
    }

    .english_title {
        position: absolute;
        top: 7vw;
        width: 100vw;
        color: rgba(51, 51, 51, 0.8);
    }

    .image {
        position: absolute;
        top: 12vw;
        width: 100vw;
        height: 58vw;

        img {
            width: 92vw;
            object-fit: cover;
            transition: width 0.3s;
        }
    }

    .join {
        position: absolute;
        top: 32vw;
        left: 0;
        width: 100vw;
        font-size: 3.5vw;
        font-weight: 600;
        color: #fff;
        transition: all 0.5s;
    }

    .button {
        position: absolute;
        top: 48vw;
        left: 50%;
        width: 7vw;
        height: 2.5vw;
        line-height: 2.5vw;
        border-radius: 2vw;
        background-color: #ffffff;
        cursor: pointer;
        transition: all 0.5s;
        transform: translateX(-50%);

        &:hover {
            transform: translateX(-50%) scale(1.1);
            opacity: 0.9;
        }
    }
}
</style>