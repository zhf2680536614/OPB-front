<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled, RefreshRight } from '@element-plus/icons-vue'

const router = useRouter()
const particles = ref([])
const isAnimating = ref(false)

const goHome = () => {
  router.push('/')
}

const refresh = () => {
  isAnimating.value = true
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

onMounted(() => {
  // 创建粒子效果
  for (let i = 0; i < 50; i++) {
    particles.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2
    })
  }
})
</script>

<template>
  <div class="error-container">
    <!-- 背景动画 -->
    <div class="particles-container">
      <div 
        v-for="(particle, index) in particles" 
        :key="index"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          animationDelay: index * 0.1 + 's'
        }"
      ></div>
    </div>

    <!-- 主要内容 -->
    <div class="error-content">
      <div class="error-code">
        <span class="number">4</span>
        <div class="circle">
          <div class="inner-circle"></div>
        </div>
        <span class="number">4</span>
      </div>

      <h1 class="error-title">页面未找到</h1>
      <p class="error-message">抱歉，您访问的页面不存在或已被移除</p>

      <div class="action-buttons">
        <el-button 
          type="primary" 
          size="large" 
          @click="goHome"
          class="home-btn"
        >
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        <el-button 
          type="info" 
          size="large" 
          @click="refresh"
          :class="{ 'is-animating': isAnimating }"
          class="refresh-btn"
        >
          <el-icon><RefreshRight /></el-icon>
          刷新页面
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
  position: relative;
  overflow: hidden;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float 15s infinite linear;
}

.error-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
}

.error-code {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 120px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

  .number {
    animation: bounce 2s infinite;
  }

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 20px;
    position: relative;
    animation: rotate 10s linear infinite;

    .inner-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      animation: pulse 2s infinite;
    }
  }
}

.error-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.error-message {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;

  .el-button {
    padding: 12px 30px;
    font-size: 16px;
    border-radius: 30px;
    transition: all 0.3s ease;

    .el-icon {
      margin-right: 8px;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .refresh-btn {
    &.is-animating {
      .el-icon {
        animation: spin 0.5s linear infinite;
      }
    }
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .error-content {
    padding: 20px;
    margin: 20px;
  }

  .error-code {
    font-size: 80px;

    .circle {
      width: 70px;
      height: 70px;
      margin: 0 10px;

      .inner-circle {
        width: 50px;
        height: 50px;
      }
    }
  }

  .error-title {
    font-size: 28px;
  }

  .error-message {
    font-size: 16px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 