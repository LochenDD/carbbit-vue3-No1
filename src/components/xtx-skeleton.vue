<template>
  <div
    class="xtx-skeleton"
    :style="{ width: props.width, height: props.height }"
    :class="{ shan: props.animated }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: props.bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  bg: {
    type: String,
    default: '#efefef'
  },
  width: {
    type: String,
    default: '100px'
  },
  height: {
    type: String,
    default: '100px'
  },
  animated: {
    type: Boolean,
    default: false
  }
})
</script>

<script>
export default {
  name: 'XtxSkeleton'
}
</script>

<style scoped lang="less">
.xtx-skeleton {
    animation: fade 1s linear infinite alternate;
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    .block {
        width: 100%;
        height: 100%;
        border-radius: 2px;
    }
}
.shan {
    &::after {
        content: '';
        position: absolute;
        animation: shan 1.5s ease 0s infinite;
        top: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
        );
        transform: skewX(-45deg);
    }
}
@keyframes shan {
    0% {
        left: -100%;
    }
    100% {
        left: 120%;
    }
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
