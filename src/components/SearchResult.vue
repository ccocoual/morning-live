<template>
  <div class="flex">
    <div>
      <img
        class="h-16 w-16 md:h-32 md:w-32 mx-auto md:mx-0 md:mr-6"
        :src="item.images[0].url"
        :alt="`${item.name} cover`"
      />
    </div>
    <div class="max-w-sm w-full flex-col">
      <div class="text-lg uppercase font-extrabold text-green-400 whitespace-no-wrap overflow-hidden ellipsis">
        {{ item.name }}
      </div>
      <div v-if="artists" class="text-lg font-light text-green-300 whitespace-no-wrap overflow-hidden ellipsis">
        {{ artists }}
      </div>
      <div class="text-lg font-light text-pink-400 text-shadow whitespace-no-wrap overflow-hidden ellipsis">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from 'vue';
import { SearchResult } from '../models';
import SearchType from './SearchType.vue';

export default {
  name: 'Track',
  props: {
    item: {
      type: Object as PropType<SearchResult>,
      required: true,
    },
    type: {
      type: SearchType,
      required: true,
    },
  },
  setup(props) {
    const artists = computed(() => props.item?.artists?.map((artist) => artist.name).join(', '));

    return {
      artists,
    };
  },
};
</script>
