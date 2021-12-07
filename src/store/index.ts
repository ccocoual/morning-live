import { createStore, Store } from 'vuex';
import SpotifyApi from '../services/spotify.api.service';
import { EpisodeInterface, SearchTypeEnum } from '../models';
import { InjectionKey } from 'vue';

export interface State {
  searchResults: EpisodeInterface[];
  searchType: SearchTypeEnum;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    searchResults: [],
    searchType: SearchTypeEnum.Episode,
  },
  mutations: {
    SET_SEARCH_RESULTS(state, payload) {
      state.searchResults = payload.searchResults;
    },
    SET_SEARCH_TYPE(state, payload) {
      state.searchType = payload.searchType;
    },
  },
  actions: {
    async search({ state, commit }, searchQuery) {
      const searchResults = await SpotifyApi.search(state.searchType, searchQuery);
      commit('SET_SEARCH_RESULTS', { searchResults });
    },
  },
});
