import { about } from '@/services/firebase'
const aboutContent = {
  namespaced: true,
  state: {
    content: {},
  },
  mutations: {
    setContent (state, val) {
      state.content = val
    },
  },
  actions: {
    setContent ({ commit }) {
      about.onSnapshot(querySnapshot => {
        const contentArray = []

        querySnapshot.forEach(doc => {
          const content = doc.data()
          content.id = doc.id
          contentArray.push(content)
        })
        commit('setContent', contentArray[0])
      })
    },
  },
  getters: {
    getContent (state) {
      return state.content
    },
  },
}

export default aboutContent
