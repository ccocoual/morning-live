<template>
  <div class="Search">
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      v-model="podcastQuery"
      type="text"
    />
    <button :disabled="!isPodcastPresent" @click="searchPodcast">Search</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  name: 'Search',
  setup() {
    const store = useStore();

    const podcastQuery = ref('');
    const isPodcastPresent = computed(() => podcastQuery.value.length > 0);

    function searchPodcast() {
      store.dispatch('search', podcastQuery.value);
    }

    return {
      podcastQuery,
      isPodcastPresent,
      searchPodcast,
    };
  },
};
</script>
