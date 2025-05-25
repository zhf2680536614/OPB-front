import request from '@/utils/request'
import type { ArticlePageQuery, ArticleDto } from '@/types'

//文章分页查询
export const getArticleList = (params: ArticlePageQuery) => {
    return request({
        url: '/manage/article/list',
        method: 'get',
        params
    })
}

export const addArticle = (data: ArticleDto) => {
    return request({
        url: '/manage/article/add',
        method: 'post',
        data
    })
}