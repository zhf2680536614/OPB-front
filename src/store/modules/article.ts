import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Article } from '@/types'

export const useArticleStore = defineStore(
    'article',
    () => {
        const article = ref<Article>({
            id: '',
            title: '',
            authorId: '',
            authorName: '',
            categoryId: '',
            categoryName: '',
            contentHtml: '',
            coverImage: '',
            audit: '',
            status: '',
            viewCount: '',
            commentCount: '',
            likeCount: '',
            collectCount: '',
            isHot: '',
            isRecommend: '',
            allowComment: '',
            publishTime: ''
        })

        //设置文章id
        const setArticleId = (id: string) => {
            article.value.id = id
        }

        //设置文章
        const setArticle = (obj: Article) => {
            article.value = obj
        }

        return {
            article,
            setArticleId,
            setArticle
        }
    },
    //设置持久化
    {
        persist: true
    }
)