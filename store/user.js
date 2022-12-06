export const state = () => ({
  user: {
    gmail: '',
    avatar: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    iin: '',
  }
})

export const  mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}
export const actions = {
    authUser({commit}, user){
      console.log(user)
      commit('SET_USER', user)
  },
}
export const getters = {
  getCurrentUser (state) {
    return state.user
  },
}
