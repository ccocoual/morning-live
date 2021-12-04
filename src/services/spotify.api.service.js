import axios from 'axios';
import * as qs from 'querystring';
import { getHash } from '../utils/get-hash.utils';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_SEARCH_API_URL = '/search';
const SPOTIFY_PLAYER_API_URL = '/me/player';
const SPOTIFY_DEVICES_API_URL = '/me/player/devices';
const SPOTIFY_SEEK_API_URL = '/me/player/seek';
const SPOTIFY_PAUSE_API_URL = '/me/player/pause';
const SPOTIFY_PLAY_API_URL = '/me/player/play';
const SPOTIFY_USER_PROFILE_API_URL = '/me';
const SPOTIFY_TRACK_ANALYSIS_BY_ID_API_URL = '/audio-analysis';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URL || 'http://localhost:3000/';

export const scopes = [
  'streaming',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-email',
  'user-read-private',
];

const singleton = Symbol();
const singletonEnforcer = Symbol();

class SpotifyApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.token = getHash(window.location.hash).access_token;

    this.session = axios.create({
      baseURL: SPOTIFY_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  isLogged() {
    console.log(this.token);
    return !!this.token;
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singleton]) {
      this[singleton] = new SpotifyApiService(singletonEnforcer);
    }

    return this[singleton];
  }

  async getUserProfile() {
    try {
      const response = await this.session.get(
        SPOTIFY_API_BASE_URL + SPOTIFY_USER_PROFILE_API_URL
      );

      return {
        displayName: response.data.display_name,
        profilePicture: response.data.images[0]
          ? response.data.images[0].url
          : 'https://i.pinimg.com/originals/fe/7a/2f/fe7a2ff2e3b57b681f667d604e3c8f2c.jpg',
      };
    } catch (e) {
      window.location.href = '/';
    }
  }

  async getDevices() {
    const response = await this.session.get(
      SPOTIFY_API_BASE_URL + SPOTIFY_DEVICES_API_URL
    );
    return {
      devices: response.data.devices,
    };
  }

  async setDevice(device) {
    await this.session.put(SPOTIFY_API_BASE_URL + SPOTIFY_PLAYER_API_URL, {
      device_ids: [device.id],
    });
  }

  async getCurrentlyPlaying() {
    try {
      const response = await this.session.get(
        SPOTIFY_API_BASE_URL + SPOTIFY_PLAYER_API_URL
      );
      return {
        track: response.data.item,
        isPlaying: response.data.is_playing,
      };
    } catch (e) {
      window.location.href = '/';
    }
  }

  async playTrack(trackId, deviceId) {
    const queryParams = {
      device_id: deviceId,
    };
    await this.session.put(
      `${SPOTIFY_API_BASE_URL}${SPOTIFY_PLAY_API_URL}?${qs.stringify(
        queryParams
      )}`,
      {
        uris: [`spotify:track:${trackId}`],
      }
    );
    return {
      isPlaying: true,
    };
  }

  async playTrackAtPosition(positionMs, deviceId) {
    const queryParams = {
      position_ms: positionMs,
      device_id: deviceId,
    };
    await this.session.put(
      `${SPOTIFY_API_BASE_URL}${SPOTIFY_SEEK_API_URL}?${qs.stringify(
        queryParams
      )}`
    );
  }

  async pauseCurrentTrack() {
    await this.session.put(SPOTIFY_API_BASE_URL + SPOTIFY_PAUSE_API_URL);
    return {
      isPlaying: false,
    };
  }

  async getTrackAnalysis(trackId) {
    try {
      const response = await this.session.get(
        `${SPOTIFY_API_BASE_URL}${SPOTIFY_TRACK_ANALYSIS_BY_ID_API_URL}/${trackId}`
      );
      return response.data;
    } catch (e) {
      window.location.href = '/';
    }
  }

  async searchTracks(searchQuery) {
    const queryParams = {
      q: searchQuery,
      type: 'track',
      limit: 5,
    };
    const response = await this.session.get(
      `${SPOTIFY_API_BASE_URL}${SPOTIFY_SEARCH_API_URL}?${qs.stringify(
        queryParams
      )}`
    );
    return response.data;
  }
}

export default SpotifyApiService.instance;
