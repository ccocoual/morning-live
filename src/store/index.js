import { createStore } from 'vuex';
import SpotifyApi from '../services/spotify.api.service';

const SearchTypeEnum = ['episode', 'track'];

export const store = createStore({
  state() {
    return {
      searchResults: [],
      searchType: 'episode',
    };
  },
  mutations: {
    SET_SEARCH_RESULTS(state, payload) {
      state.searchResults = payload.searchResults;
    },
    SET_SEARCH_TYPE(state, { searchType }) {
      if (SearchTypeEnum.includes(searchType)) {
        state.searchType = searchType;
      }
    },
  },
  actions: {
    async search({ state, commit }, searchQuery) {
      const searchResults = await SpotifyApi.search(state.searchType, searchQuery);
      commit('SET_SEARCH_RESULTS', { searchResults });
    },
  },
});
