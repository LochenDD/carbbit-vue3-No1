<template>
  <div class="top-category">
    <div class="container">
      <XtxBread separator="/">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="currentCategory.id">{{ currentCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <XtxCarousel autoPlay :slides="slides" style="height: 500px"></XtxCarousel>

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in currentCategory?.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture" >
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="i in subList" :key="i.id">
        <div class="head">
          <h3> {{i.name}} </h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="i in i?.goods" :detail="i" :key="i.id" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'Category',
  components: {
    GoodsItem
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    const slides = ref([])
    const originSubList = ref([])
    findBanner().then(({ result }) => {
      slides.value = result
    })

    const currentCategory = computed(() => {
      return store.state.category.currentCategory
    })

    const subList = computed(() => {
      return originSubList.value?.children?.filter(i => i.goods.length > 0)
    })

    watch(() => currentCategory.value, () => {
      if (route.path.includes('sub')) return
      if (!route.path.includes('category')) return
      findTopCategory(currentCategory.value?.id).then(({ result }) => {
        originSubList.value = result
      })
    }, {
      immediate: true
    })

    return {
      slides,
      currentCategory,
      subList
    }
  }
}
</script>

<style lang="less" scoped>
.top-category {
  .fade-right-enter-from, .fade-right-leave-to {
    opacity: 0;
    transform: translate(20px);
  }

  .fade-right-enter-active, .fade-right-leave-active {
    transition: all .5s;
  }

  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
