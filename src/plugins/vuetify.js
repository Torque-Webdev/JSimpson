// Vuetify Documentation https://vuetifyjs.com
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#339966',
        secondary: '#006699',
        accent: '#D8EBF1',
        info: '#339966',
      },
    },
  },
})
