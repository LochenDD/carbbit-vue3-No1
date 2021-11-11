import { getCategroyList } from '@/api/category'
import { topCategory } from '@/api/constants'

export default {
  namespaced: true,
  state: {
    categoryList: topCategory.map(cur => ({ name: cur }))
  },
  mutations: {
    setCategoryList (state, newList) {
      state.categoryList = newList
    }
  },
  actions: {
    async asyncSetCategoryList ({ commit }) {
      const res = await getCategroyList()
      commit('setCategoryList', res.result)
      return res
    }
  }
}
