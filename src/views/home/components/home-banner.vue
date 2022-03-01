<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <XtxCarousel autoPlay :slides="slides"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
const slides = ref([])
const { result } = await findBanner()
slides.value = result
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;

  ::v-deep {
    .carousel-btn.prev {
        left: 270px;
    }
    .carousel-indicator {
        padding-left: 250px;
    }
    }
}

</style>
