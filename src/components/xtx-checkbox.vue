<template>
  <div class="xtx-checkbox">
    <i class="iconfont icon-checked" v-if="props.modelValue" @click="toggleChecked"></i>
    <i class="iconfont icon-unchecked" v-else @click="toggleChecked"></i>
    <span @click="toggleChecked"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const toggleChecked = () => {
      const newVal = !props.modelValue
      emit('change', newVal)
      emit('update:modelValue', newVal)
    }

    return {
      toggleChecked,
      props
    }
  }
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    & + span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
