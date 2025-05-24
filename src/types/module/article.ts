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