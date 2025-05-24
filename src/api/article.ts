import request from '@/utils/request'
import type { ArticlePageQuery } from '@/types'

//文章分页查询
export const getArticleList = (params: ArticlePageQuery) => {
    return request({
        url: '/manage/article/list',
        method: 'get',
        params
    })
}