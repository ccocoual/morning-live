<template>
  <div class="SearchPodcast">
    <input v-model="podcastQuery" type="text" />
    <button :disabled="!isPodcastPresent" @click="searchPodcast">Search</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  name: 'SearchPodcast',
  setup() {
    const store = useStore();

    const podcastQuery = ref('');
    const isPodcastPresent = computed(() => podcastQuery.value.length > 0);

    function searchPodcast() {
      store.dispatch('searchPodcasts', podcastQuery.value);
    }

    return {
      podcastQuery,
      isPodcastPresent,
      searchPodcast,
    };
  },
};
</script>
