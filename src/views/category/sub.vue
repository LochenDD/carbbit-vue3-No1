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
        <SubSort />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import SubFilter from './components/sub-filter.vue'
import { useStore } from 'vuex'
import { defineComponent, computed, ref, reactive, provide, watch } from 'vue'
import { findSubCategoryFilter } from '@/api/category'
import SubSort from './components/sub-sort.vue'

export default defineComponent({
  name: 'Sub',
  components: {
    SubFilter,
    SubSort
  },
  setup () {
    const query = reactive({
      attrs: [],
      brandId: '-1',
      categoryId: '',
      page: 1,
      pageSize: 20
    })

    const setQuery = ({ key, value }) => {
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
    }

    provide('setQuery', setQuery)
    provide('query', query)

    const route = useRoute()
    const store = useStore()

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
      })
    }, {
      immediate: true
    })

    return {
      currentSubCategory,
      currentCategory,
      filterData
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
  }
}
</style>
