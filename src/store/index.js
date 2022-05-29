import { createStore } from 'vuex'
import { moduleAuth } from './modules/auth.js'

export const store = createStore({
  modules: {
    auth: moduleAuth,
  },
})
