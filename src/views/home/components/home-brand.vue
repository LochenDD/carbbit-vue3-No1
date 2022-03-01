<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a href="javascript:void(0);" class="iconfont icon-angle-left prev" :class="{disabled: position === 'left'}" @click="move('left')"></a>
      <a href="javascript:void(0);" class="iconfont icon-angle-right next" :class="{disabled: position === 'right'}" @click="move('right')"></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul class="list" :class="{right: position === 'right'}" v-if="result.length > 0">
          <li v-for="i in result" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div class="brand-skeleton" v-else>
          <XtxSkeleton width="240px" height="305px" animated bg="#e4e4e4" v-for="i in 5" :key="i"></XtxSkeleton>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'

export default {
  name: 'HomeBrand',
  components: { HomePanel },
  async setup () {
    const position = ref('left')
    const box = ref(null)
    const { list: result, target } = useLazyData(() => findBrand(10))
    const move = (newPosition) => {
      position.value = newPosition
    }
    return {
      result,
      target,
      position,
      box,
      move
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .brand-skeleton {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    &.right {
      transform: translateX(-50%);
    }
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
