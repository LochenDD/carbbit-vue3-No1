<template>
  <AppHeaderSticky></AppHeaderSticky>
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <main class="app-body">
    <RouterView />
  </main>
  <AppFooter></AppFooter>
</template>

<script setup>
// import { ref } from 'vue'
import { useStore } from 'vuex'
import AppTopNav from './components/app-topnav'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppHeaderSticky from './components/app-header-sticky.vue'
const store = useStore()
store.dispatch('category/asyncSetCategoryList')
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
