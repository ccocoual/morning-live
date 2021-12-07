import { createStore } from 'vuex';
import SpotifyApi from '../services/spotify.api.service';
import { Podcast, SearchType } from "../models";

export interface State {
  podcasts: Podcast[];
  searchType: SearchType;
}

export const store = createStore({
  state() {
    return {
      podcasts: [],
      searchType: SearchType.Podcast,
    };
  },
  mutations: {
    SET_PODCASTS(state, payload) {
      state.podcasts = payload.podcasts;
    },
  },
  actions: {
    async searchPodcasts({ commit }, podcastQuery) {
      const podcasts = await SpotifyApi.searchPodcasts(podcastQuery);
      commit('SET_PODCASTS', { podcasts });
    },
  },
});
