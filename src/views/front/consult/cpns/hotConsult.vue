<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { userGetHotArticleService } from '@/api/article'
import { useRouter } from 'vue-router'
import type { Article } from '@/types'

const router = useRouter()

const articleList = ref<Article[]>([])

const leftShow = ref(false)
const rightShow = ref(true)

const ulRef = ref()

const movePosition = ref(4)

const moveLength = ref(0)

watch(movePosition, (newValue) => {
    if (newValue && newValue === 4) {
        leftShow.value = false
        rightShow.value = true
    } else if (newValue && newValue === articleList.value.length) {
        leftShow.value = true
        rightShow.value = false
    } else {
        leftShow.value = true
        rightShow.value = true
    }
})

const leftMove = () => {
    moveLength.value = 22.8 + moveLength.value
    ulRef.value.style.transform = `translatex(${moveLength.value}vw)`;
    movePosition.value = movePosition.value - 1;
}

const rightMove = () => {
    moveLength.value = -22.8 + moveLength.value
    ulRef.value.style.transform = `translatex(${moveLength.value}vw)`;
    movePosition.value = movePosition.value + 1;
}

onMounted(async () => {
    const res = await userGetHotArticleService()
    if (res.data.code === 1) {
        articleList.value = res.data.data
    }
})

</script>
<template>
    <div class="main">
        <div class="big_title">
            热点资讯 - <span>Hot Consult</span>
        </div>
        <div class="list">
            <ul ref="ulRef">
                <li v-for="(item, index) in articleList" :key="index">
                    <div class="category">
                        {{ item.categoryName }}
                    </div>
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="hot">Hot 100+</div>
                    <div class="data">
                        {{ item.publishTime }}
                    </div>
                    <v-lazy-image class="image" :src="item.coverImage" alt="" />
                    <div class="button" @click="router.push({
                        name: 'userArticleDetail',
                        params: {
                            type: 'user',
                            id: item.id
                        }
                    })">
                        Learn More <el-icon class="icon">
                            <Right />
                        </el-icon>
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="leftShow" class="left_arrow" @click="leftMove">
            <el-icon>
                <ArrowLeftBold />
            </el-icon>
        </div>
        <div v-show="rightShow" class="right_arrow" @click="rightMove">
            <el-icon>
                <ArrowRightBold />
            </el-icon>
        </div>
    </div>
</template>
<style lang="less" scoped>
.main {
    position: relative;
    width: 100vw;
    height: 31vw;

    .big_title {
        position: absolute;
        left: 4vw;
        width: 30vw;
        height: 3vw;
        line-height: 3vw;
        font-size: 2vw;
        color: rgba(51, 51, 51, 0.95);

        span {
            display: inline-block;
            height: 3vw;
            line-height: 3vw;
            vertical-align: middle;
            font-size: 1vw;
            color: rgba(51, 51, 51, 0.9);
        }
    }

    .list {
        position: absolute;
        top: 4vw;
        left: 4vw;
        height: 28vw;

        ul {
            display: inline-flex;
            height: 28vw;
            transition: all 0.8s;

            li {
                margin-right: 1vw;
                width: 22vw;
                height: 27vw;
                position: relative;
                cursor: pointer;
                transition: all 1s;
                border-radius: 0.5vw;
                overflow: hidden;

                &:last-child {
                    margin-right: 0;
                }

                &:nth-child(1),
                &:nth-child(3),
                &:nth-child(5) {
                    animation: movedown 1s;
                }

                &:nth-child(2),
                &:nth-child(4) {
                    animation: moveup 1s;
                }

                &:hover {

                    .category,
                    .title,
                    .hot,
                    .data {
                        opacity: 0;
                    }

                    .image {
                        transform: scale(1.2);
                    }

                    .button {
                        transform: translate(-50%, -50%) scale(1.1);
                        opacity: 0.9;
                    }
                }

                div {
                    z-index: 10;
                    transition: all 0.5s;
                }

                .category {
                    position: absolute;
                    left: 1.5vw;
                    top: 1.5vw;
                    padding: 0 0.5vw;
                    height: 1.8vw;
                    line-height: 1.8vw;
                    text-align: center;
                    background-color: #fff;
                    color: #333;
                    border-radius: 0.3vw;
                    font-size: 0.8vw;
                    font-weight: 600;
                }

                .title {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 18vw;
                    font-size: 1vw;
                    font-weight: 600;
                    color: #fff;
                }

                .hot {
                    position: absolute;
                    left: 1.5vw;
                    top: 23.5vw;
                    font-size: 0.8vw;
                    font-weight: 550;
                    color: #fff;
                }

                .data {
                    position: absolute;
                    left: 1.5vw;
                    top: 25vw;
                    font-size: 0.8vw;
                    font-weight: 550;
                    color: #fff;
                }

                .image {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 28vw;
                    object-fit: cover;
                    border-radius: 0.5vw;
                    transition: all 0.5s;
                }

                .button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 10vw;
                    height: 3vw;
                    line-height: 3vw;
                    text-align: center;
                    background-color: #fff;
                    border-radius: 3vw;
                    font-size: 1vw;
                    font-weight: 600;
                    transform: translate(-50%, -50%) scale(0.5);
                    transition: all 0.5s;
                    opacity: 0;

                    .icon {
                        vertical-align: middle;
                    }

                    &:hover {
                        opacity: 0.7;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                }
            }
        }
    }

    .left_arrow {
        position: absolute;
        top: 18vw;
        left: 2vw;
        width: 3.5vw;
        height: 3.5vw;
        line-height: 3.5vw;
        text-align: center;
        background-color: #ffffff;
        z-index: 10;
        border-radius: 50%;
        font-size: 1.1vw;
        transition: all 0.4s;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }

    .right_arrow {
        position: absolute;
        top: 18vw;
        right: 2.5vw;
        width: 3.5vw;
        height: 3.5vw;
        line-height: 3.5vw;
        text-align: center;
        background-color: #ffffff;
        z-index: 10;
        border-radius: 50%;
        font-size: 1.1vw;
        transition: all 0.4s;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
}

:global {
    @keyframes moveup {
        from {
            margin-top: 1vw;
            opacity: 0;
        }

        to {
            margin-top: 0;
            opacity: 1;
        }
    }

    @keyframes movedown {
        from {
            margin-top: -1vw;
            opacity: 0;
        }

        to {
            margin-top: 0;
            opacity: 1;
        }
    }

    @keyframes show {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
}
</style>