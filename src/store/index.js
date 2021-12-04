import { createStore } from 'vuex';
import SpotifyApi from '../services/spotify.api.service';

export const store = createStore({
  state() {
    return {
      podcasts: [],
    };
  },
  mutations: {
    SET_PODCASTS(state, payload) {
      state.podcasts = payload.podcasts;
    },
  },
  actions: {
    async searchPodcasts({ commit }, podcastQuery) {
      const podcasts = await SpotifyApi.searchTracks(podcastQuery);
      commit('SET_PODCASTS', { podcasts });
    },
  },
});
