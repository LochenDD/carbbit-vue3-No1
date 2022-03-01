const state = () => ({
  userInfo: {}
})

export default {
  namespaced: true,
  state: state(),
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    logout (state) {
      state.userInfo = {}
    }
  },
  actions: {

  }
}
