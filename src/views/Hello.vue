<template>
  <div>
      123
  </div>
</template>

<script setup>
import axios from '@/api/request'
// console.log(res)
</script>

<script>
export default {
  async created () {
    const res = await axios.get('/home/index')
    console.log(res)
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
