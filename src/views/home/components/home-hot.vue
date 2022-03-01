<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
      <Transition name="fade">
        <ul ref="pannel" class="goods-list" v-if="result.length > 0">
        <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
            <img :src="item.picture" alt="">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
            </RouterLink>
        </li>
        </ul>
        <div class="home-skeleton" v-else>
            <div
            class="item"
            v-for="i in 4"
            :key="i"
            :style="{ backgroundColor: '#f0f9f4' }"
            >
            <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
            <XtxSkeleton bg="#e4e4e4" width="200px" height="24px" animated />
            <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
            </div>
        </div>
      </Transition>
    </HomePanel>
</template>

<script>
// import { onMounted, ref } from 'vue'
// import { useIntersectionObserver } from '@vueuse/core'
import HomePanel from './home-panel'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeHot',
  components: {
    HomePanel
  },
  async setup () {
    const { list: result, target } = useLazyData(findHot)

    return {
      result, target
    }
  }
}
</script>

<style scoped lang='less'>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
