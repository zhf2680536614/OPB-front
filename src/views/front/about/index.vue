<script setup>
import { ref } from 'vue'
import Top from '@/components/front/top.vue'
import Footer from '@/components/front/footer.vue'
import { 
  OfficeBuilding, 
  User, 
  Trophy, 
  Calendar, 
  Location, 
  Phone, 
  Message, 
  Star,
  Present,
  Timer
} from '@element-plus/icons-vue'

const achievements = [
  {
    year: '2023',
    title: '年度环保先锋组织',
    description: '在推动社区环保意识方面做出突出贡献'
  },
  {
    year: '2022',
    title: '最佳环保创新奖',
    description: '开发创新环保技术，获得行业认可'
  },
  {
    year: '2021',
    title: '社区环保示范点',
    description: '建立多个环保示范社区，推广环保理念'
  }
]

const upcomingEvents = [
  {
    date: '2024-04-22',
    title: '世界地球日特别活动',
    description: '组织社区清洁活动，宣传环保理念'
  },
  {
    date: '2024-05-01',
    title: '环保志愿者培训',
    description: '培训新加入的环保志愿者，提升环保意识'
  },
  {
    date: '2024-06-05',
    title: '世界环境日主题活动',
    description: '举办环保展览，展示环保成果'
  }
]

const contactInfo = {
  address: '北京市朝阳区环保大厦A座',
  phone: '010-12345678',
  email: 'contact@eco-protection.org',
  wechat: 'EcoProtection'
}
</script>

<template>
  <Top />
  <div class="about-container">
    <!-- 组织介绍 -->
    <el-card class="intro-card">
      <template #header>
        <div class="card-header">
          <el-icon><OfficeBuilding /></el-icon>
          <span>组织介绍</span>
        </div>
      </template>
      <div class="intro-content">
        <h2>我们的使命</h2>
        <p>致力于推动环境保护和可持续发展，通过创新和合作，为下一代创造更美好的环境。</p>
        <h2>我们的愿景</h2>
        <p>成为环保领域的领导者，推动社会各界的环保意识，实现人与自然和谐共处。</p>
      </div>
    </el-card>

    <!-- 环保成就 -->
    <el-card class="achievement-card">
      <template #header>
        <div class="card-header">
          <el-icon><Trophy /></el-icon>
          <span>环保成就</span>
        </div>
      </template>
      <div class="achievement-content">
        <el-timeline>
          <el-timeline-item
            v-for="achievement in achievements"
            :key="achievement.year"
            :timestamp="achievement.year"
            placement="top"
          >
            <el-card>
              <h3>{{ achievement.title }}</h3>
              <p>{{ achievement.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!-- 即将举行的活动 -->
    <el-card class="events-card">
      <template #header>
        <div class="card-header">
          <el-icon><Calendar /></el-icon>
          <span>即将举行的活动</span>
        </div>
      </template>
      <div class="events-content">
        <el-timeline>
          <el-timeline-item
            v-for="event in upcomingEvents"
            :key="event.date"
            :timestamp="event.date"
            placement="top"
          >
            <el-card>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <!-- 联系我们 -->
    <el-card class="contact-card">
      <template #header>
        <div class="card-header">
          <el-icon><Message /></el-icon>
          <span>联系我们</span>
        </div>
      </template>
      <div class="contact-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <h4>地址</h4>
              <p>{{ contactInfo.address }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <h4>电话</h4>
              <p>{{ contactInfo.phone }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <h4>邮箱</h4>
              <p>{{ contactInfo.email }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
  <Footer />
</template>

<style lang="less" scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .el-card {
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .intro-card {
    grid-column: 1 / -1;
    
    .intro-content {
      h2 {
        color: #409EFF;
        margin: 20px 0 10px;
        
        &:first-child {
          margin-top: 0;
        }
      }
      
      p {
        line-height: 1.6;
        color: #666;
      }
    }
  }

  .team-card {
    grid-column: 1 / -1;
    
    .team-content {
      .member-card {
        text-align: center;
        padding: 20px;
        
        h3 {
          margin: 15px 0 5px;
        }
        
        .position {
          color: #409EFF;
          margin-bottom: 10px;
        }
        
        .description {
          color: #666;
          font-size: 14px;
        }
      }
    }
  }

  .achievement-card, .events-card {
    grid-column: 1 / -1;
    
    .achievement-content, .events-content {
      padding: 20px;
      
      h3 {
        margin: 0 0 10px;
        color: #303133;
      }
      
      p {
        color: #666;
        margin: 0;
      }
    }
  }

  .contact-card {
    grid-column: 1 / -1;
    
    .contact-content {
      .contact-item {
        text-align: center;
        padding: 20px;
        
        .el-icon {
          font-size: 24px;
          color: #409EFF;
          margin-bottom: 10px;
        }
        
        h4 {
          margin: 10px 0;
          color: #303133;
        }
        
        p {
          color: #666;
          margin: 0;
        }
      }
    }
  }
}
</style>