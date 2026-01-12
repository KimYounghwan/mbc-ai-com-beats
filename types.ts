
export interface Song {
  title: string;
  artist: string;
  category: 'Korean' | 'International';
  reason: string;
  youtubeUrl: string;
}

export interface MusicRecommendationResponse {
  recommendations: Song[];
}
