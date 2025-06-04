<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Delete, Edit, View } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { manageGetArticleListService, manageDeleteArticleService, manageBatchDeleteArticleService } from '@/api/article'
import type { ArticlePageQuery } from '@/types'
import { useArticleStore } from '@/store'
import EditorArticle from './cpns/editorArticle.vue'
import type { Article } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const articleStore = useArticleStore()

const pageQuery = ref<ArticlePageQuery>({
    pageNo: 1,
    pageSize: 10,
    title: '',
    authorName: '',
    categoryName: '',
    status: '',
    audit: '',
    startPublishTime: '',
    endPublishTime: '',
    startCreateTime: '',
    endCreateTime: ''
})

// 数据列表
const articleList = ref()
const previewImage = ref()
const previewDialog = ref(false)
const loading = ref(false)
const selectedArticles = ref<string[]>([])
const total = ref(0)

const preview = (image: string) => {
    previewImage.value = image
    previewDialog.value = true
}

const editorDialog = ref(false)

// 编辑文章
const handleEdit = (row: Article) => {
    // TODO: 实现编辑文章逻辑
    articleStore.setArticle(row)
    editorDialog.value = true
}

// 删除文章
const handleDelete = (id: string) => {
    ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        const res = await manageDeleteArticleService(id)
        if (res.data.code === 1) {
            ElMessage.success("删除成功")
            pageQuery.value.pageNo = 1
            loadData()
        }
    })
}

// 表格选择变化
const handleSelectionChange = (selection: Article[]) => {
    selectedArticles.value = []
    selection.forEach(item => selectedArticles.value.push(item.id))
    console.log(selectedArticles.value);
}

// 加载数据
const loadData = async () => {
    loading.value = true
    const res = await manageGetArticleListService(pageQuery.value)
    articleList.value = res.data.data.list
    total.value = res.data.data.total
    loading.value = false
}

// 批量删除
const handleBatchDelete = () => {
    ElMessageBox.confirm('确定要删除选中的文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        const res = await manageBatchDeleteArticleService(selectedArticles.value)
        if (res.data.code === 1) {
            ElMessage.success("删除成功")
            pageQuery.value.pageNo = 1
            loadData()
        }
    })
}

// 分页大小变化
const handleSizeChange = (val: number) => {
    pageQuery.value.pageSize = val
    pageQuery.value.pageNo = 1
    loadData()
}

// 页码变化
const handleCurrentChange = (val: number) => {
    pageQuery.value.pageNo = val
    loadData()
}

const editorSuccess = (code: number) => {
    if (code === 1) {
        editorDialog.value = false
        pageQuery.value.pageSize = 10
        loadData()
    }
}

// 初始化加载数据
onMounted(() => {
    loadData()
})

</script>

<template>
    <div class="article-container">
        <!-- 顶部操作栏 -->
        <div class="operation-bar">
            <el-button type="danger" :disabled="!selectedArticles.length" @click="handleBatchDelete">
                <el-icon>
                    <Delete />
                </el-icon>批量删除
            </el-button>
        </div>

        <!-- 文章列表 -->
        <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange" border
            style="width: 100%" class="table">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="80" />
            <el-table-column prop="title" label="文章标题" min-width="200" show-overflow-tooltip />
            <el-table-column prop="categoryName" label="文章分类" min-width="200" show-overflow-tooltip />
            <el-table-column label="封面图片" width="100">
                <template #default="{ row }">
                    <el-image v-if="row.coverImage" style="width: 2.9vw; height: 2.9vw; cursor: pointer;"
                        :src="row.coverImage" show-progress fit="cover" @click="preview(row.coverImage)" />
                    <span v-else>无封面</span>
                </template>
            </el-table-column>
            <el-table-column prop="audit" label="审核状态" width="100">
                <template #default="{ row }">
                    <el-tag :type="row.audit === 1 ? 'success' : row.audit === 2 ? 'warning' : 'danger'">
                        {{ row.audit === 1 ? '审核通过' : row.audit === 2 ? '审核中' : '审核未通过' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="发布状态" width="100">
                <template #default="{ row }">
                    <el-tag :type="row.status === 2 ? 'success' : 'info'">
                        {{ row.status === 2 ? '已发布' : '草稿' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="publishTime" label="发布时间" width="160" />
            <el-table-column label="特殊标记" width="200">
                <template #default="{ row }">
                    <el-tag :type="row.isHot === 1 ? 'success' : 'danger'" class="mx-1">
                        {{ row.isHot === 1 ? '热门' : '非热' }}
                    </el-tag>
                    <el-tag :type="row.isRecommend === 1 ? 'success' : 'danger'" class="mx-1">
                        {{ row.isRecommend === 1 ? '推荐' : '非推' }}
                    </el-tag>
                    <el-tag :type="row.allowComment === 1 ? 'success' : 'danger'" class="mx-1">
                        {{ row.allowComment === 1 ? '可评' : '禁评' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template #default="{ row }">
                    <el-button-group>
                        <el-button type="primary" @click="handleEdit(row)" link>
                            <el-icon>
                                <Edit />
                            </el-icon>编辑
                        </el-button>
                        <el-button type="primary" @click="router.push({
                            name: 'articleDetail',
                            params: {
                                type: 'manage',
                                id: row.id
                            }
                        })" link>
                            <el-icon>
                                <View />
                            </el-icon>预览
                        </el-button>
                        <el-button type="danger" @click="handleDelete(row.id)" link>
                            <el-icon>
                                <Delete />
                            </el-icon>删除
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination v-model:current-page="pageQuery.pageNo" v-model:page-size="pageQuery.pageSize"
                :page-sizes="[5, 10]" :total="total" layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>

    <el-dialog title="图片预览" v-model="previewDialog" class="preview-dialog">
        <img :src="previewImage">
    </el-dialog>

    <el-dialog title="编辑文章" width="75%" v-model="editorDialog" class="editor-dialog">
        <EditorArticle @load-data="editorSuccess" />
    </el-dialog>
    <router-view></router-view>
</template>

<style lang="less" scoped>
.editor-dialog {
    width: 100vw;
}

.preview-dialog {
    width: 30vw;
    height: 30vw;

    img {
        object-fit: cover;
    }
}

.article-container {
    position: relative;
    width: 100%;
    height: 52vw;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 0.417vw;

    .operation-bar {
        position: absolute;
        left: 1vw;
        top: 0;
        display: flex;
        gap: 0.833vw;
    }

    .table {
        position: absolute;
        top: 3vw;
    }

    .pagination-container {
        position: relative;
        top: 49vw;
        display: flex;
        justify-content: flex-end;
    }

    :deep(.el-tag) {
        margin-right: 0.417vw;
    }

    :deep(.el-button-group) {
        .el-button {
            padding: 0.208vw 0.417vw;
        }
    }
}

.article-content {
    margin-top: 1.25vw;
    padding: 1.25vw;
    background-color: #f8f9fa;
    border-radius: 0.417vw;

    h3 {
        margin-bottom: 0.833vw;
        color: #333;
    }
}

:deep(.el-dialog__body) {
    padding: 1.25vw;
}
</style>