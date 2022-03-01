import { createStore } from 'vuex'
import category from './modules/category'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    category,
    user
  },
  getters: {
    userInfo (state) {
      return state.user.userInfo
    }
  },
  plugins: [createPersistedState({
    key: 'rabbit'
  })]
})
