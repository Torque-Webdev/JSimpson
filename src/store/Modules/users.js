/* eslint-disable no-useless-catch */
import { auth } from '@/services/firebase'

const users = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  getters: {
    user: state => state.user,
  },
  actions: {
    async login ({ commit }, formdata) {
      try {
        // login user
        await auth.signInWithEmailAndPassword(
          formdata.email,
          formdata.password,
        )

        const { email, uid } = auth.currentUser

        commit('SET_USER', { email, uid })
      } catch (error) {
        throw error.message
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async restPass ({}, email) {
      try {
        await auth.sendPasswordResetEmail(email)
      } catch (error) {
        throw error.message
      }
    },
  },
}

export default users
