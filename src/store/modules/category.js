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
      console.log('res: ', res)
      res.result.forEach(cur => {
        cur.open = false
      })
      commit('setCategoryList', res.result)
    }
  }
}
