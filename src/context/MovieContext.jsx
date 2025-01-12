import React, { createContext, useContext, useState, useEffect } from 'react';
import { movieApi } from '../services/movieApi';

const MovieContext = createContext();

export const sortOptions = {
  popularity: { label: 'Most Popular', value: 'popularity.desc' },
  rating: { label: 'Highest Rated', value: 'vote_average.desc' },
  newest: { label: 'Release Date', value: 'release_date.desc' },
  title: { label: 'Title A-Z', value: 'title.asc' }
};

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User preferences and data
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [userReviews, setUserReviews] = useState(() => {
    const saved = localStorage.getItem('userReviews');
    return saved ? JSON.parse(saved) : {};
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
  }, [userReviews]);
  
  // Pending filters state
  const [pendingFilters, setPendingFilters] = useState({
    genres: [],
    hideUnreleased: false,
    sortOption: 'popularity'
  });
  
  // Active filters state
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    hideUnreleased: false,
    sortOption: 'popularity'
  });

  // Load genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await movieApi.getGenres();
        setGenres(response.genres);
      } catch (err) {
        console.error('Error fetching genres:', err);
      }
    };
    fetchGenres();
  }, []);

  // Fetch popular movies for slider
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await movieApi.getMovies({
          page: 1,
          sortBy: 'popularity.desc',
          includeUnreleased: true
        });
        const formattedMovies = response.results.map(movieApi.formatMovieData);
        setPopularMovies(formattedMovies);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
      }
    };
    fetchPopularMovies();
  }, []);

  // Search functionality
  const searchMovies = async (query, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);

      const response = await movieApi.searchMovies(query, page);
      const formattedMovies = response.results.map(movieApi.formatMovieData);
      
      if (page === 1) {
        setSearchResults(formattedMovies);
      } else {
        setSearchResults(prev => [...prev, ...formattedMovies]);
      }
      
      setHasMore(response.page < response.total_pages);
      setCurrentPage(response.page);
    } catch (err) {
      setError('Error searching movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSearchResults = () => {
    if (!loading && hasMore && searchQuery) {
      searchMovies(searchQuery, currentPage + 1);
    }
  };

  // Fetch movies with active filters
  const fetchMovies = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const genreIds = activeFilters.genres.length > 0
        ? genres
            .filter(g => activeFilters.genres.includes(g.name))
            .map(g => g.id)
            .join(',')
        : '';

      const response = await movieApi.getMovies({
        page,
        sortBy: sortOptions[activeFilters.sortOption].value,
        genres: genreIds,
        hideUnreleased: activeFilters.hideUnreleased
      });

      const formattedMovies = response.results.map(movieApi.formatMovieData);
      
      if (page === 1) {
        setMovies(formattedMovies);
      } else {
        setMovies(prev => [...prev, ...formattedMovies]);
      }
      
      setHasMore(response.page < response.total_pages);
      setCurrentPage(response.page);
    } catch (err) {
      setError('Error fetching movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, [activeFilters]);

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      fetchMovies(currentPage + 1);
    }
  };

  // Reviews functions
  const addReview = (movieId, review) => {
    setUserReviews(prev => ({
      ...prev,
      [movieId]: [...(prev[movieId] || []), review]
    }));
  };

  const getAverageRating = (movieId) => {
    const reviews = userReviews[movieId];
    if (!reviews || reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Favorites and Watchlist functions
  const toggleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const toggleWatchlist = (movieId) => {
    setWatchlist(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const getFavoriteMovies = async () => {
    if (!favorites.length) return [];
    
    try {
      setLoading(true);
      const moviePromises = favorites.map(id => movieApi.getMovieDetails(id));
      const moviesData = await Promise.all(moviePromises);
      return moviesData.map(movieApi.formatMovieData);
    } catch (err) {
      console.error('Error fetching favorite movies:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getWatchlistMovies = async () => {
    if (!watchlist.length) return [];
    
    try {
      setLoading(true);
      const moviePromises = watchlist.map(id => movieApi.getMovieDetails(id));
      const moviesData = await Promise.all(moviePromises);
      return moviesData.map(movieApi.formatMovieData);
    } catch (err) {
      console.error('Error fetching watchlist movies:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updatePendingFilters = (updates) => {
    setPendingFilters(prev => ({
      ...prev,
      ...updates
    }));
  };

  const applyFilters = () => {
    setActiveFilters(pendingFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      genres: [],
      hideUnreleased: false,
      sortOption: 'popularity'
    };
    setPendingFilters(defaultFilters);
    setActiveFilters(defaultFilters);
  };

  const value = {
    movies,
    popularMovies,
    genres,
    loading,
    error,
    hasMore,
    loadMoreMovies,
    pendingFilters,
    updatePendingFilters,
    applyFilters,
    resetFilters,
    sortOptions,
    favorites,
    watchlist,
    toggleFavorite,
    toggleWatchlist,
    getFavoriteMovies,
    getWatchlistMovies,
    userReviews,
    addReview,
    getAverageRating,
    searchMovies,
    searchResults,
    loadMoreSearchResults,
    searchQuery
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
}
