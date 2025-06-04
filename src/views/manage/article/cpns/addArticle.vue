<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Quill from '@/components/manage/quill.vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { loaclCache } from '@/utils/cache'
import { Token } from '@/config/constants/Token'
import type { ArticleDto } from '@/types'
import { manageAddArticleService } from '@/api/article'
import { useArticleStore } from '@/store'
import { userGetArticleCategoryService } from '@/api/dataDictionary'

const articleStore = useArticleStore()

const token = ref(loaclCache.getCache(Token))

const categoryList = ref()

const articleDto = ref<ArticleDto>({
    title: '',
    categoryName: '',
    coverImage: '',
    contentHtml: ''
})

const formRef = ref()

// 处理图片上传
const handleCoverImageSuccess = (response: any) => {
    const res = response
    if (res.code === 1) {
        articleDto.value.coverImage = res.data
        ElMessage.success('上传成功')
    } else {
        ElMessage.error(response.message || '上传失败')
    }
}

const handleUploadError = (error: any) => {
    console.error('上传错误:', error)
    ElMessage.error('上传失败，图片大小不能超过 2MB')
}

const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 5

    if (!isImage) {
        ElMessage.error('只能上传图片文件!')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB!')
        return false
    }
    return true
}

const commit = async () => {

    await formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            if (articleStore.article.contentHtml === '<p><br></p>') {
                ElMessage.warning('请输入文章内容')
                return
            }

            articleDto.value.contentHtml = articleStore.article.contentHtml

            const res = await manageAddArticleService(articleDto.value)
            if (res.data.code === 1) {
                ElMessage.success('上传成功')
            }
        }
    })
}

const rules = ref({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    categoryName: [
        { required: true, message: '请选择文章类型', trigger: 'blur' }
    ],
    coverImage: [
        { required: true, message: '请选择文章封面', trigger: 'blur' }
    ]
})

const loadArticleCategory = async () => {
    const res = await userGetArticleCategoryService()
    if (res.data.code === 1) {
        categoryList.value = res.data.data
    }
}

onMounted(() => {
    loadArticleCategory()
})
</script>

<template>
    <el-form ref="formRef" class="form" :model="articleDto" :rules="rules">
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="articleDto.title" placeholder="请输入文章标题">
            </el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="categoryName">
            <el-select v-model="articleDto.categoryName" placeholder="请选择文章类型">
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.label" :value="item.label" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverImage">
            <el-upload class="cover-uploader" action="http://localhost:18080/api/manage/upload/image"
                :show-file-list="false" :on-success="handleCoverImageSuccess" :on-error="handleUploadError"
                :before-upload="beforeUpload" :headers="{
                    'Token': token
                }">
                <img v-if="articleDto.coverImage" :src="articleDto.coverImage" class="cover-image" />
                <el-icon v-else class="cover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
    </el-form>
    <Quill operation="add" />
    <el-button class="button" type="primary" @click="commit">确认添加</el-button>
</template>

<style lang="less" scoped>
.form {
    margin: 0 auto;
    margin-top: 2vw;
    width: 70vw;
}

.cover-uploader {
    :deep(.el-upload) {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);

        &:hover {
            border-color: var(--el-color-primary);
        }
    }
}

.cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
}

.cover-image {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
}

.button {
    position: relative;
    margin: 1vw 0;
    left: 50%;
    width: 30vw;
    transform: translateX(-50%);
}
</style>