<template>
  <div class="SearchPodcast">
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      v-model="searchQuery"
      type="text"
    />
    <button :disabled="!isSearchQueryPresent" @click="search">Search</button>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { key } from '../store';

export default {
  name: 'Search',
  setup() {
    const store = useStore(key);

    const searchQuery = ref('');
    const isSearchQueryPresent = computed(() => searchQuery.value.length > 0);

    function search() {
      store.dispatch('search', searchQuery.value);
    }

    return {
      searchQuery,
      isSearchQueryPresent,
      search,
    };
  },
};
</script>
