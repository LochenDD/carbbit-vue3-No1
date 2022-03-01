<template>
  <div class="xtx-carousel" @mouseenter="clearAutoPlay" @mouseleave="setAutoPlay">
    <ul class="carousel-body">
      <li class="carousel-item" :class="{fade: index === activeIndex}" v-for="(item, index) in slides" :key="item.id">
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left" @click="left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right" @click="right"></i
    ></a>
    <div class="carousel-indicator">
      <span @mouseenter="activeIndex = i - 1" :class="{active: activeIndex === i - 1}" v-for="i in slides.length" :key="i"></span>
    </div>
  </div>
</template>

<script>
import { ref, onUnmounted, onMounted, toRefs } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const activeIndex = ref(0)

    const left = () => {
      if (activeIndex.value === 0) {
        activeIndex.value = props.slides.length - 1
      } else {
        activeIndex.value--
      }
    }

    const right = () => {
      if (activeIndex.value === props.slides.length - 1) {
        activeIndex.value = 0
      } else {
        activeIndex.value++
      }
    }

    const interval = ref(null)

    const setAutoPlay = () => {
      if (props.autoPlay) {
        interval.value = setInterval(() => {
          right()
        }, 3000)
      }
    }

    const clearAutoPlay = () => {
      clearInterval(interval.value)
    }

    onMounted(() => {
      setAutoPlay()
    })

    onUnmounted(() => {
      clearAutoPlay()
    })

    return {
      ...toRefs(props),
      setAutoPlay,
      clearAutoPlay,
      left,
      right,
      activeIndex
    }
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
