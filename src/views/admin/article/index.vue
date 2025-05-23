<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapse = ref(false)

const handleSelect = (key) => {
  router.push(key)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="admin-container">
    <div class="sidebar-container">
      <el-menu
        :default-active="router.currentRoute.value.path"
        class="el-menu-vertical"
        :collapse="isCollapse"
        @select="handleSelect"
      >
        <el-menu-item index="/admin/dashboard">
          <el-icon><Monitor /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>

        <el-sub-menu index="/admin/article">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item index="/admin/article/list">文章列表</el-menu-item>
          <el-menu-item index="/admin/article/create">创建文章</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/admin/category">
          <template #title>
            <el-icon><Files /></el-icon>
            <span>分类管理</span>
          </template>
          <el-menu-item index="/admin/category/list">分类列表</el-menu-item>
          <el-menu-item index="/admin/category/create">创建分类</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/admin/user">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>

        <el-menu-item index="/admin/settings">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
      
      <div class="collapse-btn" @click="toggleCollapse">
        <el-icon>
          <component :is="isCollapse ? Expand : Fold" />
        </el-icon>
      </div>
    </div>

    <div class="main-content" :class="{ 'is-collapse': isCollapse }">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.admin-container {
  display: flex;
  height: 100vh;
  
  .sidebar-container {
    position: relative;
    height: 100%;
    background-color: #304156;
    
    .el-menu-vertical {
      height: 100%;
      border-right: none;
      
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }

    .collapse-btn {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #263445;
      border-radius: 50%;
      cursor: pointer;
      color: #fff;
      transition: all 0.3s;

      &:hover {
        background-color: #1f2d3d;
      }
    }
  }

  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    transition: all 0.3s;
    margin-left: 0;
    
    &.is-collapse {
      margin-left: -160px;
    }
  }
}
</style>