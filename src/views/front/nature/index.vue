<script setup>
import Banner from "./cpns/banner.vue";
const landscapes = {
  asia: {
    title: "亚洲风光",
    description:
      "探索亚洲独特的自然景观，从喜马拉雅山脉的壮丽到热带雨林的生机，展现亚洲大陆的多样魅力。",
    images: [
      new URL("../../../assets/image/nature/nature1.jpg", import.meta.url).href,
      new URL("../../../assets/image/nature/nature2.jpg", import.meta.url).href,
      new URL("../../../assets/image/nature/nature3.jpg", import.meta.url).href,
    ],
  },
  europe: {
    title: "欧美风光",
    description:
      "领略欧美大陆的自然奇观，从阿尔卑斯山脉的雪景到地中海沿岸的旖旎，感受西方自然之美。",
    images: [
    new URL("../../../assets/image/nature/nature4.jpg", import.meta.url).href,
    new URL("../../../assets/image/nature/nature5.jpg", import.meta.url).href,
    ],
  },
};
</script>

<template>
  <Top />

  <Banner />

  <!-- 亚洲风光 - 网格布局 -->
  <div class="landscape-section asia-section">
    <div class="section-content">
      <div class="text-content">
        <h2>{{ landscapes.asia.title }}</h2>
        <p>{{ landscapes.asia.description }}</p>
      </div>
      <div class="image-grid">
        <div
          v-for="(image, index) in landscapes.asia.images"
          :key="index"
          class="grid-item"
        >
          <el-image :src="image" fit="cover" />
        </div>
      </div>
    </div>
  </div>

  <!-- 欧美风光 - 轮播布局 -->
  <div class="landscape-section europe-section">
    <div class="section-content">
      <div class="text-content">
        <h2>{{ landscapes.europe.title }}</h2>
        <p>{{ landscapes.europe.description }}</p>
      </div>
      <el-carousel height="400px" class="image-carousel">
        <el-carousel-item
          v-for="(image, index) in landscapes.europe.images"
          :key="index"
        >
          <el-image :src="image" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>

  <div class="about-container">
    <!-- ... existing content ... -->
  </div>
  <Footer />
</template>

<style lang="less" scoped>
// ... existing styles ...

.landscape-section {
  padding: 60px 0;
  background-color: #f5f7fa;
  margin-bottom: 40px;

  .section-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .text-content {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      font-size: 32px;
      color: #303133;
      margin-bottom: 16px;
    }

    p {
      font-size: 16px;
      color: #666;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }
}

// 亚洲风光 - 网格布局
.asia-section {
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .grid-item {
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      .el-image {
        width: 100%;
        height: 100%;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}

// 欧美风光 - 轮播布局
.europe-section {
  background-color: #fff;

  .image-carousel {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .el-image {
      width: 100%;
      height: 100%;
    }
  }
}

// 非洲风光 - 瀑布流布局
.africa-section {
  .masonry-grid {
    columns: 4;
    column-gap: 20px;

    .masonry-item {
      break-inside: avoid;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      .el-image {
        width: 100%;
        display: block;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
        }
      }

      &:nth-child(odd) {
        height: 300px;
      }

      &:nth-child(even) {
        height: 400px;
      }
    }
  }
}

@media (max-width: 768px) {
  .asia-section .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .africa-section .masonry-grid {
    columns: 2;
  }
}

@media (max-width: 480px) {
  .asia-section .image-grid {
    grid-template-columns: 1fr;
  }

  .africa-section .masonry-grid {
    columns: 1;
  }
}
</style>
