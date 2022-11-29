export const state = () => ({
  "loader": false,
})

export const  mutations = {
  SET_LOADER(state, value) {
    state.loader = value
  },
}
export const actions = {
    setLoaderValue({commit}, value){
      commit('SET_LOADER', value)
  },
}
export const getters = {
  getLoader (state) {
    return state.loader
  },
}
