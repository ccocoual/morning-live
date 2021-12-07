<template>
  <div class="flex">
    <div>
      <img
        class="h-16 w-16 md:h-32 md:w-32 mx-auto md:mx-0 md:mr-6"
        :src="podcast.images[0].url"
        :alt="`${podcast.name} cover`"
      />
    </div>
    <div class="max-w-sm w-full flex-col">
      <div class="text-lg uppercase font-extrabold text-green-400 whitespace-no-wrap overflow-hidden ellipsis">
        {{ podcast.name }}
      </div>
      <div class="text-lg font-light text-pink-400 text-shadow whitespace-no-wrap overflow-hidden ellipsis">
        {{ podcast.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Podcast } from '../models';

export default {
  name: 'Podcast',
  props: {
    podcast: {
      type: Object as Podcast,
      required: true,
    },
  },
};
</script>
