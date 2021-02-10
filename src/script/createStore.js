import Vue from "vue";
import Vuex from "vuex";

import Responsive from './store/Responsive'
import Scroll from './store/Scroll'
import SmoothScroll from './store/SmoothScroll'
import Common from './store/Common'

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    Common: {
      namespaced: true,
      ...Common
    },
    Responsive: {
      namespaced: true,
      ...Responsive
    },
    Scroll: {
      namespaced: true,
      ...Scroll
    },
    SmoothScroll: {
      namespaced: true,
      ...SmoothScroll
    },
  }
 })