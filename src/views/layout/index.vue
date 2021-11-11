<template>
  <AppTopNav></AppTopNav>
  <AppHeader></AppHeader>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <AppFooter></AppFooter>
</template>

<script setup>
import AppTopNav from './components/app-topnav'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
