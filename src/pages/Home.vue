<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="Home">Home</div>
    <SearchType />
    <Search />

    <SearchResult
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      :item="searchResult"
      :type="searchType"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Search from '../components/Search.vue';
import SearchResult from '../components/SearchResult.vue';
import SearchType from '../components/SearchType.vue';

export default {
  name: 'Home',
  components: { SearchType, SearchResult, Search },
  setup() {
    const store = useStore();

    return {
      searchResults: computed(() => store.state.searchResults),
      searchType: computed(() => store.state.searchType),
    };
  },
};
</script>
