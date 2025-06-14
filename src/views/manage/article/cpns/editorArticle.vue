<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useArticleStore } from '@/store/modules/article';
import { loaclCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { Token } from '@/config/constants/Token'
import { manageUpdateArticleService } from '@/api/article'
const token = ref(loaclCache.getCache(Token))
import { userGetArticleCategoryService } from '@/api/dataDictionary'

const articleStore = useArticleStore()

const formRef = ref()

// 处理图片上传
const handleCoverImageSuccess = (response: any) => {
    const res = response
    if (res.code === 1) {
        articleStore.article.coverImage = res.data
        ElMessage.success('上传成功')
    } else {
        ElMessage.error(response.message || '上传失败')
    }
}

const handleUploadError = (error: any) => {
    console.error('上传错误:', error)
    ElMessage.error('上传失败，请检查服务器时间是否正确')
}

const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2

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

const emit = defineEmits(['load-data'])

const tempId = ref()

const commit = async () => {
    await formRef.value.validate(
        async (valid: boolean) => {
            if (valid) {
                if (articleStore.article.categoryId === articleStore.article.categoryName) {
                    //说明文章类型没有更改
                    articleStore.article.categoryId = tempId.value
                }
                const res = await manageUpdateArticleService(articleStore.article)
                if (res.data.code === 1) {
                    ElMessage.success("修改成功")
                    emit('load-data', res.data.code)
                }
            }
        }
    )
}

const categoryList = ref<any[]>([])

const categoryFlag = ref(false)

const auditList = ref([
    {
        "value": 1,
        "label": '审核通过'
    },
    {
        "value": 2,
        "label": '审核中'
    },
    {
        "value": 3,
        "label": '审核未通过'
    },
])

const statusList = ref([
    {
        "value": 1,
        "label": '草稿'
    },
    {
        "value": 2,
        "label": '已发布'
    }
])

const hotList = ref([
    {
        "value": 0,
        "label": '非热'
    },
    {
        "value": 1,
        "label": '热门'
    }
])

const rules = ref({
    title: [
        { required: true, message: '请输入文章标题', trigger: 'blur' }
    ],
    categoryName: [
        { required: true, message: '请选择文章类型', trigger: 'blur' }
    ],
    audit: [
        { required: true, message: '请选择审核文章', trigger: 'blur' }
    ],
    status: [
        { required: true, message: '请选择文章状态', trigger: 'blur' }
    ],
    isHot: [
        { required: true, message: '请选择文章是否热门', trigger: 'blur' }
    ],
    coverImage: [
        { required: true, message: '请选择文章封面', trigger: 'blur' }
    ],
})

const loadArticleCategory = async () => {
    const res = await userGetArticleCategoryService()
    if (res.data.code === 1) {
        categoryList.value = res.data.data
        categoryFlag.value = true
    }
}

onMounted(() => {
    loadArticleCategory()
})
</script>
<template>
    <el-form ref="formRef" class="form" :model="articleStore.article" :rules="rules">
        <el-form-item label="文章标题" prop="title">
            <el-input v-model="articleStore.article.title" placeholder="请输入文章标题">
            </el-input>
        </el-form-item>
        <el-form-item label="文章类型" prop="categoryName">
            <el-select v-model="articleStore.article.categoryName" placeholder="请选择文章类型">
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.label" :value="item.label" />
            </el-select>
        </el-form-item>
        <el-form-item label="文章审核" prop="audit">
            <el-select v-model="articleStore.article.audit" placeholder="请审核文章">
                <el-option v-for="(item, index) in auditList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="文章状态" prop="status">
            <el-select v-model="articleStore.article.status" placeholder="请选择文章状态">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="文章热门" prop="isHot">
            <el-select v-model="articleStore.article.isHot" placeholder="请选择文章是否热门">
                <el-option v-for="(item, index) in hotList" :key="index" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverImage">
            <el-upload class="cover-uploader" action="http://localhost:18080/api/manage/upload/image"
                :show-file-list="false" :on-success="handleCoverImageSuccess" :on-error="handleUploadError"
                :before-upload="beforeUpload" :headers="{
                    'Token': token
                }">
                <img v-if="articleStore.article.coverImage" :src="articleStore.article.coverImage"
                    class="cover-image" />
                <el-icon v-else class="cover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
    </el-form>
    <Quill operation="editor" />
    <el-button class="button" type="primary" @click="commit">确认修改</el-button>

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