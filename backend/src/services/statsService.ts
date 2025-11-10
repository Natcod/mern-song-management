import { Song } from '../models/Song.js';

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

export const statsService = {
  async getStatistics(): Promise<Statistics> {
    // Get total songs
    const totalSongs = await Song.countDocuments();

    // Get total unique artists
    const totalArtists = (await Song.distinct('artist')).length;

    // Get total unique albums
    const totalAlbums = (await Song.distinct('album')).length;

    // Get total unique genres
    const totalGenres = (await Song.distinct('genre')).length;

    // Get songs per genre
    const songsPerGenreArray = await Song.aggregate([
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const songsPerGenre: Record<string, number> = {};
    songsPerGenreArray.forEach((item) => {
      songsPerGenre[item._id] = item.count;
    });

    // Get songs per artist
    const songsPerArtistArray = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const songsPerArtist: Record<string, number> = {};
    songsPerArtistArray.forEach((item) => {
      songsPerArtist[item._id] = item.count;
    });

    // Get songs per album
    const songsPerAlbumArray = await Song.aggregate([
      {
        $group: {
          _id: '$album',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const songsPerAlbum: Record<string, number> = {};
    songsPerAlbumArray.forEach((item) => {
      songsPerAlbum[item._id] = item.count;
    });

    // Get albums per artist
    const albumsPerArtistArray = await Song.aggregate([
      {
        $group: {
          _id: {
            artist: '$artist',
            album: '$album',
          },
        },
      },
      {
        $group: {
          _id: '$_id.artist',
          albumCount: { $sum: 1 },
        },
      },
      {
        $sort: { albumCount: -1 },
      },
    ]);

    const albumsPerArtist: Record<string, number> = {};
    albumsPerArtistArray.forEach((item) => {
      albumsPerArtist[item._id] = item.albumCount;
    });

    // Get most common genre
    const mostCommonGenre =
      songsPerGenreArray.length > 0 ? songsPerGenreArray[0]._id : null;

    // Get least common genre
    const leastCommonGenre =
      songsPerGenreArray.length > 0
        ? songsPerGenreArray[songsPerGenreArray.length - 1]._id
        : null;

    // Get top artist
    const topArtist =
      songsPerArtistArray.length > 0
        ? {
            name: songsPerArtistArray[0]._id,
            songs: songsPerArtistArray[0].count,
          }
        : null;

    // Calculate genre distribution (percentage)
    const genreDistribution: Record<string, string> = {};
    if (totalSongs > 0) {
      songsPerGenreArray.forEach((item) => {
        const percentage = ((item.count / totalSongs) * 100).toFixed(2);
        genreDistribution[item._id] = `${percentage}%`;
      });
    }

    return {
      totals: {
        songs: totalSongs,
        artists: totalArtists,
        albums: totalAlbums,
        genres: totalGenres,
      },
      songsPerGenre,
      songsPerArtist,
      songsPerAlbum,
      albumsPerArtist,
      mostCommonGenre,
      leastCommonGenre,
      topArtist,
      genreDistribution,
    };
  },
};
