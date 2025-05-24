<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Plus, Delete, Edit, View } from '@element-plus/icons-vue'
import { dateEquals, ElMessage, ElMessageBox } from 'element-plus'
import { getArticleList } from '@/api/article'
import type { ArticlePageQuery } from '@/types'
import { DateUtil } from '@/utils/date'

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
const loading = ref(false)
const selectedArticles = ref()
const total = ref(0)

// 加载数据
const loadData = async () => {
    loading.value = true
    const res = await getArticleList(pageQuery.value)
    articleList.value = res.data.data.list
    total.value = res.data.data.total
    pageQuery.value.pageNo = res.data.data.pageNo
    loading.value = false
}

// 表格选择变化
const handleSelectionChange = (selection: []) => {
    selectedArticles.value = selection
}

// 新增文章
const handleAdd = () => {
    // TODO: 实现新增文章逻辑
}

// 编辑文章
const handleEdit = () => {
    // TODO: 实现编辑文章逻辑
}

// 查看文章
const handleView = () => {

}

// 删除文章
const handleDelete = () => {
    ElMessageBox.confirm('确定要删除这篇文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {

    })
}

// 批量删除
const handleBatchDelete = () => {

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



// 初始化加载数据
onMounted(() => {
    loadData()
})
</script>

<template>
    <div class="article-container">
        <!-- 顶部操作栏 -->
        <div class="operation-bar">
            <el-button type="danger" :disabled="true" @click="handleBatchDelete">
                <el-icon>
                    <Delete />
                </el-icon>批量删除
            </el-button>
        </div>

        <!-- 文章列表 -->
        <el-table v-loading="loading" :data="articleList" @selection-change="handleSelectionChange" border
            style="width: 100%" class="table">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="title" label="文章标题" min-width="200" show-overflow-tooltip />
            <el-table-column prop="summary" label="文章摘要" min-width="200" show-overflow-tooltip />
            <el-table-column label="封面图片" width="100">
                <template #default="{ row }">
                    <el-image v-if="row.coverImage" :src="row.coverImage" fit="cover"
                        style="width: 2.9vw; height: 2.9vw;" />
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
                    <el-tag type="danger" class="mx-1">
                        {{ row.isHot === '1' ? '热门' : '非热' }}
                    </el-tag>
                    <el-tag type="warning" class="mx-1">
                        {{ row.isRecommend === '1' ? '推荐' : '非推' }}
                    </el-tag>
                    <el-tag type="info" class="mx-1">
                        {{ row.allowComment === '1' ? '可评' : '禁评' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                    <el-button-group>
                        <el-button type="primary" link>
                            <el-icon>
                                <Edit />
                            </el-icon>编辑
                        </el-button>
                        <el-button type="primary" link>
                            <el-icon>
                                <View />
                            </el-icon>查看
                        </el-button>
                        <el-button type="danger" link>
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
</template>

<style lang="less" scoped>
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
        z-index: 10;
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