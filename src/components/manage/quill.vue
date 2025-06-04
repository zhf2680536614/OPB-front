<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useArticleStore } from '@/store'
import ImageResize from 'quill-image-resize-module-ts'

const props = defineProps({
    operation: String,
})

const articleStore = useArticleStore()
const content = ref(props.operation == 'editor' ? articleStore.article.contentHtml : '')

// 处理图片上传
const handleImageUpload = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            resolve(e.target?.result)
        }
        reader.onerror = (error) => {
            reject(error)
        }
        reader.readAsDataURL(file)
    })
}

watch(
    () => articleStore.article.contentHtml,
    (newValue) => {
        if (newValue !== content.value) {
            content.value = newValue
        }
    }
)

const editorOptions = {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link', 'image']
            ],
            handlers: {
                image: function (this: any) {
                    const input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', 'image/*')
                    input.click()

                    input.onchange = async () => {
                        const file = input.files?.[0]
                        if (file) {
                            try {
                                const imageUrl = await handleImageUpload(file)
                                const range = this.quill.getSelection()
                                this.quill.insertEmbed(range.index, 'image', imageUrl)
                            } catch (error) {
                                console.error('图片上传失败:', error)
                            }
                        }
                    }
                }
            }
        },
        imageResize: ImageResize
    },
    placeholder: '请输入文章内容...',
    readOnly: false
}

const onEditorChange = (html: string) => {
    articleStore.article.contentHtml = html
}

onMounted(() => {
    // 使用 MutationObserver 监听图片插入
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'IMG') {
                        const img = node as HTMLImageElement
                        img.style.maxWidth = '100%'
                        img.style.cursor = 'move'
                        img.draggable = true

                        // 添加调整大小的功能
                        img.addEventListener('mousedown', (e) => {
                            e.preventDefault()
                            if (e.offsetX > img.offsetWidth - 10 && e.offsetY > img.offsetHeight - 10) {
                                const startX = e.clientX
                                const startY = e.clientY
                                const startWidth = img.offsetWidth
                                const startHeight = img.offsetHeight

                                const mouseMoveHandler = (e: MouseEvent) => {
                                    e.preventDefault()
                                    const width = startWidth + (e.clientX - startX)
                                    const height = startHeight + (e.clientY - startY)
                                    img.style.width = `${width}px`
                                    img.style.height = `${height}px`
                                }

                                const mouseUpHandler = () => {
                                    document.removeEventListener('mousemove', mouseMoveHandler)
                                    document.removeEventListener('mouseup', mouseUpHandler)
                                }

                                document.addEventListener('mousemove', mouseMoveHandler)
                                document.addEventListener('mouseup', mouseUpHandler)
                            }
                        })
                    }
                })
            }
        })
    })

    // 监听编辑器内容变化
    const editorElement = document.querySelector('.ql-editor')
    if (editorElement) {
        observer.observe(editorElement, {
            childList: true,
            subtree: true
        })
    }
})
</script>

<template>
    <div class="main-container">

        <QuillEditor v-model:content="content" :options="editorOptions" contentType="html"
            @update:content="onEditorChange" class="editor-container" />
    </div>
</template>

<style lang="less" scoped>
.main-container {
    width: 100%;
    padding: 1vw;
    background: #fff;
    border-radius: 0.417vw;

    .editor-container {
        width: 100%;
        min-height: 24vw;
        margin-bottom: 1vw;

        :deep(.ql-container) {
            height: calc(100% - 42px);
            font-size: 16px;
        }

        :deep(.ql-toolbar) {
            border-top-left-radius: 0.417vw;
            border-top-right-radius: 0.417vw;
        }

        :deep(.ql-editor) {
            min-height: 100%;
            padding: 1vw;
        }

        :deep(.image-resizer) {
            border: 1px solid #1890ff;
            background: rgba(24, 144, 255, 0.1);
        }

        :deep(.ql-image-resizer) {
            position: absolute;
            border: 1px solid #1890ff;
            background: rgba(24, 144, 255, 0.1);
            cursor: move;
        }
    }

    .editor-content {
        width: 100%;
        padding: 1vw;
        margin-top: 1vw;
        border: 1px solid #dcdfe6;
        border-radius: 0.417vw;
        background: #f8f9fa;
    }
}
</style>