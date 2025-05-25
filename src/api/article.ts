import request from '@/utils/request'
import type { ArticlePageQuery, ArticleDto, Article } from '@/types'

//文章分页查询
export const manageGetArticleListService = (params: ArticlePageQuery) => {
    return request({
        url: '/manage/article/list',
        method: 'get',
        params
    })
}

export const manageAddArticleService = (data: ArticleDto) => {
    return request({
        url: '/manage/article/add',
        method: 'post',
        data
    })
}

export const manageGetArticleByIdService = (parmas: string) => {
    return request({
        url: `/manage/article/${parmas}`,
        method: 'get'
    })
}

export const manageUpdateArticleService = (data: Article) => {
    return request({
        url: '/manage/article/update',
        method: 'put',
        data
    })
}

export const manageDeleteArticleService = (id: string) => {
    return request({
        url: `/manage/article/${id}`,
        method: 'delete'
    })
}