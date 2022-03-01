<template>
    <RouterLink :to="to"><slot></slot></RouterLink>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: String,
      default: '/'
    }
  },
  setup () {

  }
}
</script>

<style scoped>

</style>
