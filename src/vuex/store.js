/*
 * @Description: Vuex
 * @Version: 1.0.2
 * @Author: Edision Lu
 * @Date: 2020-05-25 15:35:40
 * @LastEditor: dahuyingxiong666@gmail.com
 * @LastEditTime: 2020-07-21 15:21:33
 * @FilePath: \ccbProject\ccb_5g\src\vuex\store.js
 */

import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
// no transitoin in 5G site
const shouldUseTransition = !/transition=none/.test(location.href);
store.registerModule("vux", {
  state: {
    fiveGScrollTop: 0,
    isLoading: false,
    direction: shouldUseTransition ? "forward" : ""
  },
  getters: {},
  mutations: {
    updateFiveGPosition(state, payload) {
      state.fiveGScrollTop = payload.top;
    },
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading;
    },
    updateDirection(state, payload) {
      if (!shouldUseTransition) {
        return;
      }
      state.direction = payload.direction;
    }
  },
  actions: {
    updateFiveGPosition({ commit }, top) {
      commit({ type: "updateFiveGPosition", top: top });
    }
  }
});
export default store;
