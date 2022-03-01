<script>
import { createVNode } from 'vue'
export default {
  name: 'XtxBread',
  props: {
    separator: {
      type: String,
      default: ''
    }
  },
  render () {
    const items = this.$slots.default()
    const dymanicItems = items.reduce((pre, cur, index) => {
      pre.push(cur)
      if (index < items.length - 1) {
        pre.push(createVNode('span', { class: 'separator' }, this.separator))
      }
      return pre
    }, [])
    return createVNode('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .separator {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
