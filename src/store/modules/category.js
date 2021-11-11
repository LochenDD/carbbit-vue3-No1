import { getCategroyList } from '@/api/category'

export default {
  namespaced: true,
  state: {
    categoryList: []
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
