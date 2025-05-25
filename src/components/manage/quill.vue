<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Quill } from '@vueup/vue-quill'
import 'quill/dist/quill.snow.css'  // 引入 Quill 样式
import { useArticleStore } from '@/store'

const articleStore = useArticleStore()

const editorRef = ref()

const props = defineProps({
    operation: String,
})

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

let quill: any = null

watch(
    () => articleStore.article.contentHtml,
    (newValue) => {
        if (quill && newValue !== quill.root.innerHTML) {
            const range = quill.getSelection()
            quill.root.innerHTML = newValue
            if (range) {
                quill.setSelection(range)
            }
        }
    }
)

onMounted(() => {
    const toolbarOptions = [
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
        ['link', 'image']  // 添加链接和图片功能
    ]

    quill = new Quill(editorRef.value, {
        theme: 'snow',
        modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    image: function (this: { quill: Quill }) {
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
            }
        },
        placeholder: '请输入文章内容...',
        readOnly: false
    })

    if (props.operation === "editor") {
        //编辑操作
        quill.root.innerHTML = articleStore.article.contentHtml
    } else if (props.operation === 'add') {
        quill.root.innerHTML = ''
    }

    // 添加图片样式
    const style = document.createElement('style');
    style.textContent = `
        .ql-editor img {
            max-width: 100%;
            cursor: move;
        }
        .ql-editor img:hover {
            outline: 2px solid #1890ff;
        }`;
    document.head.appendChild(style);

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
                            if (e.offsetX > img.offsetWidth - 10 && e.offsetY > img.offsetHeight - 10) {
                                const startX = e.clientX
                                const startY = e.clientY
                                const startWidth = img.offsetWidth
                                const startHeight = img.offsetHeight

                                const mouseMoveHandler = (e: MouseEvent) => {
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

    observer.observe(editorRef.value, {
        childList: true,
        subtree: true
    })

    // 保存编辑器实例
    editorRef.value.__quill = quill

    // 监听内容变化
    quill.on('text-change', () => {
        articleStore.article.contentHtml = quill.root.innerHTML
    })
})
</script>

<template>
    <div class="main-container">
        <div ref="editorRef" class="editor-container"></div>
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

            img {
                max-width: 100%;
                cursor: move;
            }
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