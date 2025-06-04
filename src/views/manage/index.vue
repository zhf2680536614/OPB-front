<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'is-collapsed': isCollapse }">
      <div class="logo-container">
        <img src="../../assets/image/nature/nature3.jpg" alt="Logo" class="logo">
        <span class="title">环境保护管理系统</span>
      </div>
      <el-menu :default-active="activeIndex" class="el-menu-vertical" :collapse="isCollapse"
        background-color="transparent" text-color="rgba(255, 255, 255, 0.65)" active-text-color="#fff">
        <el-menu-item index="1" @click="router.push('/admin/home')">
          <el-icon>
            <HomeFilled />
          </el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Document />
            </el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="2-1" @click="router.push('/admin/article')">文章列表</el-menu-item>
          <el-menu-item index="2-2" @click="router.push('/admin/add')">添加文章</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Files />
            </el-icon>
            <span>分类管理</span>
          </template>
          <el-menu-item index="3-1" @click="router.push('/admin/category')">分类列表</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="4-1" @click="router.push('/admin/user')">用户列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon :class="{ 'is-collapsed': isCollapse }">
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content" :class="{ 'is-collapsed': isCollapse }">
      <div class="header">
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPath }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="user-info">
          <el-dropdown>
            <span class="user-dropdown">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, Document, Files, User, Fold, Expand } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)

// 根据路由路径设置激活的菜单项
const activeIndex = computed(() => {
  const pathMap: Record<string, string> = {
    '/admin/home': '1',
    '/admin/article': '2-1',
    '/admin/add': '2-2',
    '/admin/category': '3-1',
    '/admin/user': '4-1',
  }
  return pathMap[route.path] || '1'
})

const currentPath = computed(() => {
  const pathMap: Record<string, string> = {
    '/admin/home': '首页',
    '/admin/article': '文章列表',
    '/admin/add': '添加文章',
    '/admin/category': '分类列表',
    '/admin/user': '用户列表',
    '/admin/articleDetail/**': '文章预览'
  }
  return pathMap[route.path] || '文章预览'
})

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped lang="less">
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;

  .sidebar {
    height: 100vh;
    background: linear-gradient(180deg, #1a1f2c 0%, #141824 100%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    box-shadow: 0 0 1.042vw rgba(0, 0, 0, 0.2);
    position: relative;
    width: 12.5vw;
    backdrop-filter: blur(0.521vw);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
      pointer-events: none;
    }

    &.is-collapsed {
      width: 3.333vw;

      .logo-container {
        padding: 0.833vw 0;
        justify-content: center;

        .title {
          display: none;
          opacity: 0;
          transform: translateX(-0.521vw);
        }
      }

      .el-menu-vertical {

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title) {
          padding: 0 1.042vw;
        }
      }
    }

    .logo-container {
      height: 3.333vw;
      padding: 0.833vw 1.25vw;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.03);
      margin-bottom: 0.417vw;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.052vw;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
      }

      .logo {
        width: 1.667vw;
        height: 1.667vw;
        margin-right: 0.625vw;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 0.313vw;
        object-fit: cover;
        box-shadow: 0 0.104vw 0.417vw rgba(0, 0, 0, 0.2);
      }

      .title {
        color: #fff;
        font-size: 0.938vw;
        font-weight: 600;
        white-space: nowrap;
        opacity: 1;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        letter-spacing: 0.026vw;
        text-shadow: 0 0.104vw 0.208vw rgba(0, 0, 0, 0.2);
      }
    }

    .el-menu-vertical {
      border-right: none;
      padding: 0.417vw;
      background: transparent !important;

      :deep(.el-menu-item) {
        height: 2.604vw;
        line-height: 2.604vw;
        margin: 0.208vw 0;
        border-radius: 0.417vw;
        padding: 0 0.833vw;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0.104vw;
          background: linear-gradient(to bottom, #1890ff, #36a3ff);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #fff !important;
          transform: translateX(0.208vw);

          &::before {
            opacity: 1;
          }
        }

        &.is-active {
          background: linear-gradient(90deg, #1890ff 0%, #36a3ff 100%) !important;
          color: #fff !important;
          box-shadow: 0 0.208vw 0.625vw rgba(24, 144, 255, 0.3);

          &::before {
            opacity: 1;
          }
        }

        .el-icon {
          margin-right: 0.625vw;
          font-size: 0.938vw;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      :deep(.el-sub-menu__title) {
        height: 2.604vw;
        line-height: 2.604vw;
        margin: 0.208vw 0;
        border-radius: 0.417vw;
        padding: 0 0.833vw;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0.104vw;
          background: linear-gradient(to bottom, #1890ff, #36a3ff);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #fff !important;

          &::before {
            opacity: 1;
          }
        }

        .el-icon {
          margin-right: 0.625vw;
          font-size: 0.938vw;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      :deep(.el-menu-item-group__title) {
        padding: 0;
      }

      :deep(.el-sub-menu .el-menu-item) {
        min-width: 8.333vw;
        padding-left: 2.5vw !important;
      }
    }

    .collapse-btn {
      position: absolute;
      bottom: 1.042vw;
      left: 50%;
      transform: translateX(-50%);
      width: 1.667vw;
      height: 1.667vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      color: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(0.208vw);
      border: 0.052vw solid rgba(255, 255, 255, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        transform: translateX(-50%) scale(1.1);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .el-icon {
        font-size: 0.833vw;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

        &.is-collapsed {
          transform: rotate(180deg);
        }
      }
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    margin-left: 0;
    background: #f0f2f5;

    &.is-collapsed {
      margin-left: 0;
    }

    .header {
      height: 3.333vw;
      background: #fff;
      box-shadow: 0 0.052vw 0.208vw rgba(0, 21, 41, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.25vw;
      position: relative;
      z-index: 1;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.052vw;
        background: linear-gradient(90deg, rgba(24, 144, 255, 0.1) 0%, rgba(24, 144, 255, 0) 100%);
      }

      .breadcrumb {
        :deep(.el-breadcrumb__item) {
          .el-breadcrumb__inner {
            color: #666;
            font-weight: normal;
            transition: all 0.3s ease;

            &.is-link {
              color: #1890ff;

              &:hover {
                color: #36a3ff;
              }
            }
          }
        }
      }

      .user-info {
        .user-dropdown {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0.417vw 0.833vw;
          border-radius: 0.417vw;
          transition: all 0.3s;
          background: rgba(0, 0, 0, 0.02);
          border: 0.052vw solid transparent;

          &:hover {
            background: rgba(24, 144, 255, 0.05);
            border-color: rgba(24, 144, 255, 0.1);
            transform: translateY(-0.104vw);
          }

          .username {
            margin-left: 0.417vw;
            color: #666;
            font-weight: 500;
          }
        }
      }
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 1.042vw;
      background: #f0f2f5;

      &::-webkit-scrollbar {
        width: 0.417vw;
        height: 0.417vw;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.208vw;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 0.208vw;
      }
    }
  }
}
</style>