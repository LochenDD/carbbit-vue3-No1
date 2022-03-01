<template>
  <div class='sub-sort'>
    <div class="sort">
      <a href="javascript:;" @click="changeSort(null)" :class="{active: sortField === null}">默认排序</a>
      <a href="javascript:;" @click="changeSort('publishTime')" :class="{active: sortField === 'publishTime'}">最新商品</a>
      <a href="javascript:;" @click="changeSort('orderNum')" :class="{active: sortField === 'orderNum'}">最高人气</a>
      <a href="javascript:;" @click="changeSort('evaluateNum')" :class="{active: sortField === 'evaluateNum'}">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i :class="{active: sortMethod === 'asc'}" class="arrow up" />
        <i :class="{active: sortMethod === 'desc'}" class="arrow down" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox v-model="onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    const infiniteStatus = reactive({
      loading: false,
      finished: false
    })

    const searchParams = reactive({
      // inventory 是否有库存
      inventory: false,
      // onlyDiscount 只显示特惠
      onlyDiscount: false,
      // sortField 排序字段 可选值：[publishTime,orderNum,price,evaluateNum]
      // publishTime:最新商品 orderNum: 最高人气 price:价格排序 evaluateNum：评论最多
      sortField: null,
      // sortMethod 排序规则  asc:升序  desc:降序
      sortMethod: null
    })

    const changeSort = (sortField) => {
      searchParams.sortField = sortField
      if (sortField !== 'price') {
        searchParams.sortMethod = null
      } else {
        if (searchParams.sortMethod === null) {
          searchParams.sortMethod = 'asc'
        } else if (searchParams.sortMethod === 'asc') {
          searchParams.sortMethod = 'desc'
        } else {
          searchParams.sortMethod = 'asc'
        }
      }
      emit('sortChange', searchParams)
    }

    return {
      ...toRefs(searchParams),
      ...toRefs(infiniteStatus),
      changeSort
    }
  }
}
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all .3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
            &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
