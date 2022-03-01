<template>
  <Transition name="down">
    <div class="xtx-message" :style="style[type]" v-show="isShow">
      <i class="iconfont" :class="style[type].icon"></i>
      <span class="text">{{text}}</span>
    </div>
  </Transition>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    type: {
      type: String,
      default: 'warning'
    },
    text: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 2000
    }
  },
  setup (props) {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warning: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }

    const isShow = ref(false)
    onMounted(() => {
      isShow.value = true
    })

    setTimeout(() => {
      isShow.value = false
    }, props.delay - 500)

    return {
      style,
      isShow
    }
  }
}
</script>

<style scoped lang="less">
.down-enter-active, .down-leave-active {
  transition: all .5s;
}
.down-enter-from, .down-leave-to /* .down-leave-active below version 2.1.8 */ {
  transform: translateY(-75px);
  opacity: 0;
}

.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
