<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
      <template #right><XtxMore path="/"/></template>
      <Transition name="fade">
        <!-- 面板内容 -->
        <ul class="goods-list" v-if="result.length > 0">
          <li v-for="item in result" :key="item.id">
            <RouterLink :to="`/category/sub/${item.id}`">
              <img
                :src="item.picture"
                alt=""
              />
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <div class="home-skeleton" v-else>
          <div v-for="i in 4" :key="i">
            <XtxSkeleton width="306px" height="306px" bg="#e4e4e4" animated></XtxSkeleton>
          </div>
        </div>
      </Transition>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import { findNew } from '@/api/home'
import { useLazyData } from '@/hooks'

export default {
  name: 'HomeNew',
  components: {
    HomePanel
  },
  async setup () {
    const { list: result, target } = useLazyData(findNew)

    return {
      result,
      target
    }
  }
}
</script>

<style scoped lang="less">
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
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
