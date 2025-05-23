<script setup></script>
<template>
    <div class="main">
        <div class="big_title">
            亚洲风光 - <span>Asia View</span>
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
}
</style>