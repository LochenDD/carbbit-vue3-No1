import { getCategroyList } from '@/api/category'
import { topCategory } from '@/constants'

export default {
  namespaced: true,
  state: {
    categoryList: topCategory.map(cur => ({ name: cur })),
    currentSubCategory: {},
    currentCategory: {}
  },
  mutations: {
    setCurrentSubCategory (state, payload) {
      const { category, sub } = payload
      state.currentSubCategory = sub
      this.commit('category/setCurrentCategory', category)
    },
    setCurrentCategory (state, payload) {
      state.currentCategory = payload
    },
    setCategoryList (state, newList) {
      state.categoryList = newList
    },
    hide (state, changeItemId) {
      const currentItem = state.categoryList.find(cur => cur.id === changeItemId)
      currentItem.open = false
    },
    show (state, changeItemId) {
      const currentItem = state.categoryList.find(cur => cur.id === changeItemId)
      currentItem.open = true
    }
  },
  actions: {
    async asyncSetCategoryList ({ commit }) {
      const res = await getCategroyList()
      res.result.forEach(cur => {
        cur.open = false
      })
      commit('setCategoryList', res.result)
    }
  }
}
