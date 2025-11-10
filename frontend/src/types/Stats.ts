export interface Statistics {
  totals: {
    songs: number;
    artists: number;
    albums: number;
    genres: number;
  };
  songsPerGenre: Record<string, number>;
  songsPerArtist: Record<string, number>;
  songsPerAlbum: Record<string, number>;
  albumsPerArtist: Record<string, number>;
  mostCommonGenre: string | null;
  leastCommonGenre: string | null;
  topArtist: {
    name: string;
    songs: number;
  } | null;
  genreDistribution: Record<string, string>;
}
