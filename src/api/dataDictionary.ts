import request from '@/utils/request'

export const userGetArticleCategoryService = () => {
    return request({
        url:'/user/data-dictionary/article-category'
    })
}