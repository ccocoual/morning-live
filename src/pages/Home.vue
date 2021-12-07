<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="Home">Home</div>
    <SearchType />
    <SearchPodcast />

    <SearchResult
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :item="searchResult"
      :type="searchType"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import SearchPodcast from '../components/Search.vue';
import SearchResult from '../components/SearchResult.vue';
import SearchType from '../components/SearchType.vue';
import { key } from '../store';

export default {
  name: 'Home',
  components: { SearchType, SearchResult, SearchPodcast },
  setup() {
    const store = useStore(key);

    return {
      searchResults: computed(() => store.state.searchResults),
      searchType: computed(() => store.state.searchType),
    };
  },
};
</script>
