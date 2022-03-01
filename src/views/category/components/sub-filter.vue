<template>
    <!-- 筛选区 -->
   <div class="sub-filter">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a href="javascript:;" :class="{active: +query.brandId === +i.id}" v-for="i in filterData.brands" :key="i.id" @click="setQuery({key: 'brandId', value: i.id})">{{i.name}}</a>
            </div>
        </div>
        <div class="item" v-for="i in filterData.saleProperties" :key="i.id">
            <div class="head">{{i.name}}：</div>
            <div class="body">
                <a href="javascript:;" :class="{active: query.attrs.find(cur => cur.groupName === i.name).propertyName === j.name}" v-for="j in i.properties" :key="j.id" @click="setQuery({key: 'attrs', value: {groupName: i.name, propertyName: j.name}})">{{j.name}}</a>
            </div>
        </div>
   </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'SubFilter',
  props: {
    filterData: {
      default: () => {},
      type: Object
    }
  },
  setup () {
    const query = inject('query')
    const setQuery = inject('setQuery')

    return {
      query,
      setQuery
    }
  }
}
</script>

<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
