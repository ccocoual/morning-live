export interface SearchResult {
  images: [];
  name: string;
  description: string;
}

export interface EpisodeInterface extends SearchResult {}

export interface TrackInterface extends SearchResult {
  artists: [];
}

export enum SearchTypeEnum {
  Episode = 'episode',
  Track = 'track',
}
