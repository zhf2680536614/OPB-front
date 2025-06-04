<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { userGetArticleCategoryService } from "@/api/dataDictionary";
import { userGetArticleListService } from "@/api/article";
import type { ArticlePageQuery } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

const pageQuery = ref<ArticlePageQuery>({
  pageNo: 1,
  pageSize: 8,
  title: "",
  authorName: "",
  categoryName: "政策法规",
  status: "",
  audit: "",
  startPublishTime: "",
  endPublishTime: "",
  startCreateTime: "",
  endCreateTime: "",
});

const articleList = ref();

// 加载数据
const loadData = async () => {
  const res = await userGetArticleListService(pageQuery.value);
  articleList.value = res.data.data.list;
};

const leftImage = ref(
  new URL("../../../../assets/image/login/right.jpg", import.meta.url).href
);

const categoryList = ref();

const loadArticleCategory = async () => {
  const res = await userGetArticleCategoryService();
  if (res.data.code === 1) {
    categoryList.value = res.data.data;
  }
};

const changeCategoryName = (name: string) => {
  pageQuery.value.categoryName = name;
  loadData();
};

onMounted(() => {
  loadArticleCategory();
  loadData();
});
</script>
<template>
  <div class="main">
    <div class="top">
      <div class="left">最新资讯 - <span>Latest Consult</span></div>
      <div class="center">
        <ul>
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            @click="changeCategoryName(item.label)"
            :class="{ active: item.label === pageQuery.categoryName }"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="right">
        查看全部
        <el-icon class="more">
          <ArrowRight />
        </el-icon>
      </div>
    </div>
    <div class="bottom">
      <v-lazy-image class="left" :src="leftImage" alt="" />
      <div class="right">
        <ul>
          <li v-for="(item, index) in articleList" :key="index">
            <v-lazy-image class="image" :src="item.coverImage" alt="" />
            <div class="title">{{ item.title }}</div>
            <div class="other">
              <el-icon class="collect">
                <StarFilled />
              </el-icon>
              <span>100</span>
              <el-icon class="count">
                <View />
              </el-icon>
              <span>100</span>
            </div>
            <div class="black"></div>

            <div
              class="green"
              @click="
                router.push({
                  name: 'userArticleDetail',
                  params: {
                    type: 'user',
                    id: item.id,
                  },
                })
              "
            >
              查看文章详情
              <el-icon class="detail">
                <ArrowRight />
              </el-icon>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
li {
  list-style: none;
}

.active {
  background-color: #00be9a;
  color: #ffffff !important;
}

.main {
  width: 99vw;
  height: 50vw;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99vw;
    height: 4vw;

    .left {
      width: 17vw;
      height: 3vw;
      line-height: 3vw;
      font-size: 2vw;
      color: rgba(51, 51, 51, 0.95);
      margin-left: 4vw;

      span {
        display: inline-block;
        height: 3vw;
        line-height: 3vw;
        vertical-align: middle;
        font-size: 1vw;
        color: rgba(51, 51, 51, 0.9);
      }
    }

    .center {
      height: 2vw;
      line-height: 2vw;
      flex: 1;

      ul {
        display: flex;
        margin-left: 5.1vw;

        li {
          margin-right: 0.5vw;
          padding: 0 0.3vw;
          color: #333;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: #00be9a;
            color: #ffffff;
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .right {
      margin-right: 3vw;
      height: 3vw;
      line-height: 3vw;
      color: rgb(51, 51, 51, 0.95);
      cursor: pointer;
      vertical-align: middle;
      transition: all 0.1s;

      &:hover {
        color: #00be9a;
      }

      .more {
        vertical-align: middle;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 1vw;
    width: 99vw;
    height: 46vw;

    .left {
      margin-left: 4vw;
      width: 20vw;
      height: 46vw;
      object-fit: cover;
    }

    .right {
      margin-left: 2vw;
      height: 46vw;

      ul {
        display: flex;
        align-content: space-between;
        flex-wrap: wrap;
        height: 46vw;

        li {
          position: relative;
          width: 17vw;
          height: 22.5vw;
          margin-right: 0.75vw;
          color: #fff;
          border: 0.15vw solid rgb(255, 255, 255, 0);
          overflow: hidden;
          transition: all 0.2s;
          cursor: pointer;

          .image {
            position: absolute;
            display: block;
            width: 17vw;
            height: 22.5vw;
            object-fit: cover;
            transition: all 0.2s;
          }

          .title {
            position: absolute;
            left: 0.8vw;
            top: 17.3vw;
            font-size: 1.1vw;
            font-weight: 300;
            z-index: 10;
            transition: all 0.2s;
          }

          .other {
            position: absolute;
            left: 0.8vw;
            bottom: 0.5vw;
            height: 1vw;
            line-height: 1vw;
            z-index: 10;
            font-size: 0.8vw;
            font-weight: 300;

            .collect {
              display: inline-block;
              vertical-align: middle;
              color: red;
            }

            .count {
              display: inline-block;
              vertical-align: middle;
              margin-left: 1vw;
            }

            span {
              display: inline-block;
              padding: 0 0.25vw;
              vertical-align: middle;
            }
          }

          .black {
            position: absolute;
            width: 17vw;
            height: 22.5vw;
            background-image: linear-gradient(
              180deg,
              rgba(137, 137, 137, 0) 0%,
              rgba(0, 0, 0, 0.9) 100%
            );
            opacity: 0.5;
            transition: all 0.2s;
          }

          .green {
            position: absolute;
            bottom: -4.5vw;
            width: 100%;
            height: 4.5vw;
            background-color: #00be9a;
            text-align: center;
            line-height: 4.5vw;
            font-weight: 300;
            vertical-align: middle;
            transition: all 0.2s;
            z-index: 1000;

            &:hover {
              color: rgba(62, 62, 62, 1);
            }

            .detail {
              vertical-align: middle;
            }
          }

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            border: 0.15vw solid #00be9a;

            .green {
              bottom: 0;
            }

            .image {
              transform: scale(1.2);
            }

            .black {
              opacity: 0;
            }

            .title {
              opacity: 0;
            }

            .other {
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>
