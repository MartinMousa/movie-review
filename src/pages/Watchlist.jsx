import { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { movieApi } from '../services/movieApi';

export default function Watchlist() {
  const { watchlist } = useMovies();
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const movies = await Promise.all(
          watchlist.map(async (id) => {
            try {
              const movieData = await movieApi.getMovieDetails(id);
              return movieApi.formatMovieData(movieData);
            } catch (err) {
              console.error(`Failed to fetch movie ${id}:`, err);
              return null;
            }
          })
        );

        setWatchlistMovies(movies.filter(movie => movie !== null));
      } catch (err) {
        setError('Failed to load watchlist movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistMovies();
  }, [watchlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-light dark:border-accent-dark border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  if (!watchlistMovies.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
        <p className="text-gray-600 dark:text-gray-400">
          You haven't added any movies to your watchlist yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Watchlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlistMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
