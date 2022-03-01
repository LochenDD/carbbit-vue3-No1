<template>
  <div class="sub">
    <div class="container">
      <XtxBread separator="/">
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="currentCategory.id" :to="`/category/${currentCategory.id}`">{{currentCategory.name}}</XtxBreadItem>
        </Transition>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="currentSubCategory.id" :to="`/category/sub/${currentSubCategory.id}`">{{currentSubCategory.name}}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <SubFilter :filterData="filterData"></SubFilter>

      <div class="goods-list">
        <SubSort @sortChange="sortChange"/>
        <ul>
          <li v-for="good in goodsList" :key="good.id">
            <GoodsItem :detail="good" />
          </li>
        </ul>
        <XtxInfiniteLoading ref="infinite" v-model:loading="loading" :finished="finished" @load="onLoad"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import SubFilter from './components/sub-filter.vue'
import { useStore } from 'vuex'
import { defineComponent, computed, ref, reactive, provide, watch } from 'vue'
import { findSubCategoryFilter, findSubCategoryGoods } from '@/api/category'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'

export default defineComponent({
  name: 'Sub',
  components: {
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    const infinite = ref(null)

    let query = reactive({
      attrs: [],
      brandId: '-1',
      categoryId: route.params.id,
      page: 1,
      pageSize: 20
    })

    const onLoad = () => {
      if (finished.value) return
      findSubCategoryGoods(query).then(({ result }) => {
        if (result.items.length === 0) {
          finished.value = true
          loading.value = false
          infinite.value.stop()
          return
        }
        query.page++
        loading.value = false
        goodsList.value = [...goodsList.value, ...result.items]
      })
    }

    const setQuery = ({ key, value }) => {
      console.log('🚀 ~ file: sub.vue ~ line 93 ~ key, value', key, value)
      if (key === 'attrs') {
        const { groupName, propertyName } = value
        const item = query.attrs.find(cur => cur.groupName === groupName)
        if (item) {
          item.propertyName = propertyName
        } else {
          query.attrs.push({
            groupName,
            propertyName
          })
        }
      } else {
        query[key] = value
      }
      console.log('🚀 ~ file: sub.vue ~ line 160 ~ query', query)
    }

    provide('setQuery', setQuery)
    provide('query', query)

    const currentSubCategory = computed(() => {
      return store.state.category.currentSubCategory
    })

    const currentCategory = computed(() => {
      return store.state.category.currentCategory
    })

    watch(currentCategory, () => {
      query.categoryId = currentCategory.value.id
    }, {
      immediate: true
    })

    const filterData = ref([])

    watch(() => currentSubCategory.value.id, () => {
      if (!route.path.includes('sub')) return
      // 二级菜单修改后重新请求筛选项数据
      findSubCategoryFilter(currentSubCategory.value.id).then(({ result }) => {
        result.saleProperties.forEach((cur) => cur.properties.unshift({ id: -1, name: '全部' }))
        result.brands.unshift({ id: -1, name: '全部' })
        filterData.value = result
        query.attrs = result.saleProperties.reduce((pre, cur) => {
          pre.push({
            groupName: cur.name,
            propertyName: '全部'
          })
          return pre
        }, [])

        // 二级菜单修改后重新请求商品数据
        query.page = 1
        finished.value = false
        onLoad()
      })
    }, {
      immediate: true
    })

    const sortChange = (sortParams) => {
      query = reactive({ ...query, ...sortParams })
      query.page = 1
      finished.value = false
      goodsList.value = []
      onLoad()
    }

    return {
      currentSubCategory,
      currentCategory,
      filterData,
      onLoad,
      loading,
      finished,
      goodsList,
      infinite,
      sortChange
    }
  }
})
</script>

<style lang="less" scoped>
.sub {
  .fade-right-enter-from, .fade-right-leave-to {
    opacity: 0;
    transform: translate(20px, 0);
  }

  .fade-right-enter-active, .fade-right-leave-active {
    transition: all .5s;
  }

  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
