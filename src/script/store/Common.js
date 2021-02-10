const state = {
  current: "",
  isSearchOpen: false,
};

const getters = {
  isSP(state) {
    return state.windowWidth < 1000;
  },
};

const mutations = {
  setCurrent(state, current) {
    state.prev = state.current;
    state.current = current;
  },
  openSearch(state) {
    state.isSearchOpen = true;
  },
  closeSearch(state) {
    state.isSearchOpen = false;
  },
};

const actions = {
  setCurrent: ({ commit }, current) => commit("setCurrent", current),
  openSearch: ({ commit }) => commit("openSearch"),
  closeSearch: ({ commit }) => commit("closeSearch"),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
