import Vue from 'vue'
import Vuex from 'vuex'
import about from './Modules/about'
import awards from './Modules/awards'
import gallery from './Modules/gallery'
import head from './Modules/head'
import images from './Modules/images'
import promo from './Modules/promo'
import skills from './Modules/skills'
import videos from './Modules/videos'
import users from './Modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    head,
    about,
    promo,
    images,
    videos,
    skills,
    awards,
    gallery,
    users,
  },
})
