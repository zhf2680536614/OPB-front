<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { User, Calendar } from '@element-plus/icons-vue'
import type { Article } from '@/types'
import { userGetArticleByIdService } from '@/api/article'

const route = useRoute()

const article = ref<Article>({} as Article)

const loadArticleDetail = async () => {
    const res = await userGetArticleByIdService(route.params.id)
    if (res.data.code === 1) {
        article.value = res.data.data
    }
}

const styleCtr = ref(false)

onMounted(() => {
    loadArticleDetail()
    if (route.params.type === 'manage') {
        styleCtr.value = true
        console.log(styleCtr.value);
    }
})
</script>

<template>

    <div class="article-detail" :class="{ 'manage-detail': styleCtr }">
        <Top />
        <!-- 文章封面图 -->

        <img :src="article.coverImage" class="cover-image">

        <!-- 文章头部信息 -->
        <div class="article-header">
            <h1 class="title">{{ article.title }}</h1>
            <div class="tags">
                <el-tag class="el-tag" v-if="article.isHot" type="danger" effect="plain">热门</el-tag>
                <el-tag class="el-tag" v-if="article.isRecommend" type="success" effect="plain">推荐</el-tag>
                <el-tag class="el-tag" type="info" effect="plain">{{ article.categoryName }}</el-tag>
            </div>
            <div class="meta">
                <div class="meta-item">
                    <el-icon class="icon">
                        <User />
                    </el-icon>
                    <span> 作者 {{ article.authorName }}</span>
                </div>
                <div class="meta-item">
                    <el-icon class="icon">
                        <Calendar />
                    </el-icon>
                    <span> 发布日期 {{ article.publishTime }}</span>
                </div>
            </div>
        </div>

        <hr class="hr">

        <!-- 文章内容 -->
        <div class="article-content" v-html="article.contentHtml"></div>
        <hr class="hr">
        <Footer />
    </div>
</template>

<style lang="less" scoped>
.manage-detail {
    width: 83vw !important;
}

.article-detail {
    margin: 0 auto;
    width: 100%;
    z-index: 1000;


    .cover-image {
        width: 100%;
        height: 20vw;
        object-fit: cover;
    }

    .article-header {
        margin-top: 1vw;
        margin-bottom: 2vw;
        text-align: center;

        .title {
            font-size: 1.6vw;
            font-weight: 300;
        }

        .tags {
            margin: 1vw 0;

            .el-tag {
                margin-right: 0.5vw;
            }
        }

        .meta {
            display: flex;
            justify-content: center;
            font-size: 0.9vw;
            font-weight: 300;

            .meta-item {
                width: 15vw;

                .icon {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .meta-item:nth-child(2) {
                margin-left: 2vw;
            }
        }

    }

    .hr {
        width: 100%;
    }

    .article-content {
        margin: 1vw auto;
        padding: 3vw 10vw;
        width: 82vw;
        background-color: #fff;
        border-radius: 0.3vw;
        box-shadow: 0 0 0.5vw #b4b4b4;
    }
}
</style>