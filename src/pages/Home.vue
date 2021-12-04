<template>
  <div class="Home">Home</div>
  <SearchPodcast />
  <div>
    <Podcast v-for="podcast in podcasts" :key="podcast.id" :podcast="podcast" />
  </div>
</template>

<script>
import SearchPodcast from '../components/SearchPodcast.vue';
import Podcast from '../components/Podcast.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'Home',
  components: { Podcast, SearchPodcast },
  setup() {
    const store = useStore();

    return {
      podcasts: computed(() => store.state.podcasts),
    };
  },
};
</script>
