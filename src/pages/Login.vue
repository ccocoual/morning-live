<template>
  <div className="min-h-screen flex flex-col content-center items-center justify-center">
    <a
      className="bg-spotify-default hover:bg-spotify-hover border-b-4 border-green-900 active:border-b-0 text-white font-bold py-2 px-4 rounded-full"
      :href="spotifyApiUrl"
    >
      Login to Spotify
    </a>
  </div>
</template>

<script>
import { authEndpoint, clientId, redirectUri, scopes } from '../services/spotify.api.service';
import { computed } from 'vue';

export default {
  name: 'Login',

  setup() {
    const spotifyApiUrl = computed(() => {
      const queryParams = [
        `client_id=${clientId}`,
        `redirect_uri=${redirectUri}`,
        `scope=${scopes.join('%20')}`,
        'response_type=token',
        'show_dialog=true',
      ].join('&');

      return authEndpoint + '?' + queryParams;
    });

    return {
      spotifyApiUrl,
    };
  },
};
</script>
