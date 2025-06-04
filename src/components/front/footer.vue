<script setup></script>
<template>
    <div class="footer">
        <div class="top">
            <ul>
                <li>
                    <el-icon class="icon">
                        <Sunrise />
                    </el-icon>
                    <span>绿韵天成</span>
                </li>
                <li>
                    <el-icon class="icon">
                        <Sunny />
                    </el-icon>
                    <span>碧海同护</span>
                </li>
                <li>
                    <el-icon class="icon">
                        <Pouring />
                    </el-icon>
                    <span>翠影留情</span>
                </li>
                <li>
                    <el-icon class="icon">
                        <Ship />
                    </el-icon>
                    <span>生态共荣</span>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <ul>
                <li>
                    <span class="text1">关于我们</span>
                </li>
                <li>
                    <span class="text1">帮助中心</span>
                </li>
                <li>
                    <span class="text1">商务合作</span>
                </li>
                <li>
                    <span class="text1">搜索推荐</span>
                </li>
                <li>
                    <span class="text1">友情链接</span>
                </li>
                <li>
                    <span class="text1">服务热线</span>
                </li>
            </ul>
            <div class="copy_right">
                CopyRight © ATEY
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
li{
    list-style: none;
}
.footer {
    height: 15vw;
    background-color: #F5F5F5;

    .top {
        height: 5vw;

        ul {
            height: 5vw;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            li {
                width: 15vw;
                height: 5vw;
                line-height: 5vw;
                text-align: center;

                .icon {
                    vertical-align: middle;
                    font-size: 3vw;
                    font-weight: 300;
                    color: #00BE9A;
                }

                span {
                    padding: 0 1vw;
                    vertical-align: middle;
                    font-size: 1.5vw;
                    font-weight: 300;
                }
            }
        }
    }

    .bottom {
        margin-top: 2vw;

        ul {
            display: flex;
            justify-content: center;

            li {
                width: 10vw;
                text-align: center;
                border-right: 0.1vw solid rgba(51, 51, 51, 0.5);
                color: rgba(51, 51, 51, 0.8);
                cursor: pointer;
                transition: all 0.2s;

                &:last-child {
                    border-right: 0;
                }

                &:hover {
                    color: #00BE9A;
                }
            }
        }

        .copy_right {
            margin-top: 3vw;
            text-align: center;
            color: rgba(51, 51, 51, 0.8);
        }
    }
}
</style>