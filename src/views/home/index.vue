<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <Suspense>
          <!-- 左侧分类 -->
          <HomeCategory />
          <template #fallback>
            <!-- 防止可视加载时跳一个true -->
            <div style="height: 800px">
              Loading......
            </div>
          </template>
        </Suspense>
        <Suspense>
          <!-- 轮播图 -->
          <HomeBanner />
        </Suspense>
      </div>
    </div>
    <Suspense>
      <!-- 新鲜好物 -->
      <HomeNew />
    </Suspense>
    <Suspense>
      <!-- 人气推荐 -->
      <HomeHot />
    </Suspense>
    <Suspense>
      <!-- 热门品牌 -->
      <HomeBrand />
    </Suspense>
    <!-- 商品区域 -->
    <HomeProduct />
    <!-- 最新专题 -->
    <HomeSpecial />
  </div>
</template>

<script setup>
import HomeBanner from './components/home-banner.vue'
import HomeCategory from './components/home-category.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
</script>

<style scoped lang="less">

</style>
