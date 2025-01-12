const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

export const movieApi = {
  // Get movies with sorting and filtering
  getMovies: async ({ 
    page = 1, 
    sortBy = 'popularity.desc', 
    genres = '',
    hideUnreleased = true,
    includeUnreleased = false,
    minDate = null
  }) => {
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      page: page.toString(),
      sort_by: sortBy,
      ...(genres && { with_genres: genres }),
      ...(hideUnreleased && { 'release_date.lte': today }),
      ...(includeUnreleased && { 'release_date.gte': minDate || today }),
      include_adult: false,
      include_video: false
    });

    const response = await fetch(
      `${BASE_URL}/discover/movie?${params}`,
      { headers }
    );
    return response.json();
  },

  // Get movie details with videos
  getMovieDetails: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?append_to_response=credits,videos,reviews`,
      { headers }
    );
    const data = await response.json();
    
    // Get additional videos if needed
    const videosResponse = await fetch(
      `${BASE_URL}/movie/${movieId}/videos`,
      { headers }
    );
    const videosData = await videosResponse.json();
    
    return {
      ...data,
      videos: {
        ...data.videos,
        results: [...(data.videos?.results || []), ...(videosData.results || [])]
      }
    };
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const params = new URLSearchParams({
      query,
      page: page.toString(),
      include_adult: false,
      language: 'en-US'
    });

    const response = await fetch(
      `${BASE_URL}/search/movie?${params}`,
      { headers }
    );
    return response.json();
  },

  // Get movie genres
  getGenres: async () => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list`,
      { headers }
    );
    return response.json();
  },

  // Get movie recommendations
  getMovieRecommendations: async (movieId, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?page=${page}`,
      { headers }
    );
    return response.json();
  },

  // Format image URL
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null;
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },

  // Get trailer URL
  getTrailerUrl: (videos) => {
    if (!videos?.results?.length) return null;
    
    // First try to find an official trailer
    const officialTrailer = videos.results.find(
      video => 
        video.type === 'Trailer' && 
        video.site === 'YouTube' &&
        video.official &&
        video.name.toLowerCase().includes('official')
    );

    // Then try to find any trailer
    const anyTrailer = videos.results.find(
      video => video.type === 'Trailer' && video.site === 'YouTube'
    );

    // Finally, just get any video
    const anyVideo = videos.results.find(
      video => video.site === 'YouTube'
    );

    const video = officialTrailer || anyTrailer || anyVideo;
    return video ? `https://www.youtube.com/watch?v=${video.key}` : null;
  },

  // Get movie suggestions
  getMovieSuggestions: async (query) => {
    if (!query?.trim()) return [];
    
    const params = new URLSearchParams({
      query: query.trim(),
      page: '1',
      include_adult: false,
      language: 'en-US'
    });

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?${params}`,
        { headers }
      );
      const data = await response.json();
      return data.results
        .slice(0, 5)
        .map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ? new Date(movie.release_date).getFullYear() : null
        }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  },

  // Format movie data
  formatMovieData: (movie) => ({
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : '',
    rating: movie.vote_average,
    thumbnailUrl: movieApi.getImageUrl(movie.poster_path),
    backdropUrl: movieApi.getImageUrl(movie.backdrop_path, 'original'),
    genre: movie.genres?.map(g => g.name) || [],
    duration: movie.runtime ? `${movie.runtime} min` : '',
    cast: movie.credits?.cast?.slice(0, 10).map(actor => actor.name) || [],
    director: movie.credits?.crew?.find(c => c.job === 'Director')?.name || '',
    popularity: movie.popularity,
    voteCount: movie.vote_count,
    trailerUrl: movie.videos ? movieApi.getTrailerUrl(movie.videos) : null
  })
};
