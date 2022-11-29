export const state = () => ({
  user: {}
})

export const  mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}
export const actions = {
    authUser({commit}, user){
      commit('SET_USER', user)
  },
}
export const getters = {
  getCurrentUser (state) {
    return state.user
  },
}
