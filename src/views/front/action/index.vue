<script setup>
import { ref } from "vue";
import Top from "@/components/front/top.vue";
import Footer from "@/components/front/footer.vue";
import {
  Calendar,
  Guide,
  Trophy,
  Timer,
  Star,
  Present,
} from "@element-plus/icons-vue";

const checkInDays = ref(0);
const totalPoints = ref(0);
const todayChecked = ref(false);

const checkIn = () => {
  if (!todayChecked.value) {
    checkInDays.value++;
    totalPoints.value += 10;
    todayChecked.value = true;
  }
};

const guides = [
  {
    title: "日常环保小贴士",
    items: [
      "使用可重复使用的购物袋",
      "选择步行或骑自行车代替开车",
      "节约用水，及时关闭水龙头",
      "垃圾分类投放",
      "使用节能电器",
    ],
  },
  {
    title: "绿色生活方式",
    items: [
      "选择本地生产的食物",
      "减少一次性塑料制品的使用",
      "使用环保清洁产品",
      "选择公共交通出行",
      "参与社区环保活动",
    ],
  },
  {
    title: "环保行动指南",
    items: [
      "参与植树造林活动",
      "组织社区清洁日",
      "推广环保理念",
      "支持环保组织",
      "参与环保志愿者活动",
    ],
  },
];

const achievements = [
  { title: "环保新人", points: 50, icon: "Present" },
  { title: "环保达人", points: 200, icon: "Star" },
  { title: "环保先锋", points: 500, icon: "Trophy" },
];
</script>

<template>
  <div class="main">
    <Top />
    <div class="action-container">
      <!-- 打卡模块 -->
      <el-card class="check-in-card">
        <template #header>
          <div class="card-header">
            <span
              ><el-icon>
                <Calendar />
              </el-icon>
              环保打卡</span
            >
          </div>
        </template>
        <div class="check-in-content">
          <div class="stats">
            <div class="stat-item">
              <el-icon>
                <Timer />
              </el-icon>
              <span>连续打卡: {{ checkInDays }} 天</span>
            </div>
            <div class="stat-item">
              <el-icon>
                <Trophy />
              </el-icon>
              <span>环保积分: {{ totalPoints }}</span>
            </div>
          </div>
          <el-button
            type="success"
            :disabled="todayChecked"
            @click="checkIn"
            class="check-in-btn"
          >
            {{ todayChecked ? "今日已打卡" : "立即打卡" }}
          </el-button>
        </div>
      </el-card>

      <!-- 环保指南模块 -->
      <el-card class="guide-card">
        <template #header>
          <div class="card-header">
            <span
              ><el-icon>
                <Guide />
              </el-icon>
              环保指南</span
            >
          </div>
        </template>
        <div class="guide-content">
          <el-collapse>
            <el-collapse-item
              v-for="(guide, index) in guides"
              :key="index"
              :title="guide.title"
            >
              <ul class="guide-list">
                <li v-for="(item, itemIndex) in guide.items" :key="itemIndex">
                  {{ item }}
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>

      <!-- 成就系统 -->
      <el-card class="achievement-card">
        <template #header>
          <div class="card-header">
            <span
              ><el-icon>
                <Trophy />
              </el-icon>
              环保成就</span
            >
          </div>
        </template>
        <div class="achievement-content">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="achievement-item"
          >
            <el-icon>
              <component :is="achievement.icon" />
            </el-icon>
            <div class="achievement-info">
              <h4>{{ achievement.title }}</h4>
              <p>需要积分: {{ achievement.points }}</p>
            </div>
            <el-progress
              :percentage="(totalPoints / achievement.points) * 100"
              :format="() => `${totalPoints}/${achievement.points}`"
            />
          </div>
        </div>
      </el-card>
    </div>
    <Footer class="footer" />
  </div>
</template>

<style lang="less" scoped>
.main {
  position: relative;
  width: 100vw;
  .action-container {
    position: absolute;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    z-index: 1000;

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

    .check-in-card {
      .check-in-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .stats {
          display: flex;
          justify-content: space-around;
          width: 100%;

          .stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
          }
        }

        .check-in-btn {
          width: 200px;
          height: 50px;
          font-size: 18px;
        }
      }
    }

    .guide-card {
      .guide-content {
        .guide-list {
          list-style: none;
          padding: 0;

          li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }

    .achievement-card {
      .achievement-content {
        .achievement-item {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;

          .el-icon {
            font-size: 24px;
            color: #67c23a;
          }

          .achievement-info {
            flex: 1;

            h4 {
              margin: 0;
              font-size: 16px;
            }

            p {
              margin: 4px 0 0;
              font-size: 14px;
              color: #666;
            }
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    top: 42vw;
    width: 100%;
  }
}
</style>
