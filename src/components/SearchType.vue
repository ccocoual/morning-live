<template>
  <div class="bg-gray-200 rounded-md">
    <div class="inline-flex rounded-md">
      <input
        v-model="searchType"
        value="episode"
        @change="setSearchType"
        type="radio"
        name="search-type"
        id="searchEpisode"
        checked
        hidden
      />
      <label
        for="searchEpisode"
        class="radio text-center self-center py-2 px-4 rounded-md cursor-pointer hover:opacity-75"
      >
        Episode
      </label>
    </div>
    <div class="inline-flex rounded-md">
      <input
        v-model="searchType"
        value="track"
        @change="setSearchType"
        type="radio"
        name="search-type"
        id="searchTrack"
        hidden
      />
      <label
        for="searchTrack"
        class="radio text-center self-center py-2 px-4 rounded-md cursor-pointer hover:opacity-75"
      >
        Track
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { SearchTypeEnum } from '../models';
import { useStore } from 'vuex';
import { key } from '../store';

export default {
  name: 'SearchType',
  setup() {
    const searchType = ref(SearchTypeEnum.Episode);
    const store = useStore(key);
    function setSearchType() {
      store.commit('SET_SEARCH_TYPE', { searchType });
    }

    return {
      searchType,
      setSearchType,
    };
  },
};
</script>

<style scoped>
input:checked ~ .radio {
  color: white;
  background-color: var(--spotify-default);
}
</style>
