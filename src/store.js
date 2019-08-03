import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    package: JSON.parse(unescape(process.env.PACKAGE_JSON))
  },
  getters: {
    version: state => state.package.version
  },
  mutations: {

  },
  actions: {

  }
})
