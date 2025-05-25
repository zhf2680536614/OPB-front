export interface ArticlePageQuery {
    pageNo: String | Number
    pageSize: String | Number
    title: String
    authorName: String
    categoryName: String
    status: String | Number
    audit: String | Number
    startPublishTime: String
    endPublishTime: String
    startCreateTime: String
    endCreateTime: String
}

export interface ArticleDto {
    title: String
    categoryId: String | Number
    coverImage: string
    contentHtml: String
}

export interface Article {
    id: string,
    title: string | number,
    authorId: string | number,
    authorName: string,
    categoryId: string | number,
    categoryName: string,
    contentHtml: string,
    coverImage: string,
    audit: string | number,
    status: string | number,
    viewCount: string | number,
    commentCount: string | number,
    likeCount: string | number,
    collectCount: string | number,
    isHot: string | number,
    isRecommend: string | number,
    allowComment: string | number
}