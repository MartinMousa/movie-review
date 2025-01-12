import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const { loading, getFavoriteMovies } = useMovies();
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const movies = await getFavoriteMovies();
      setFavoriteMovies(movies);
    };
    loadFavorites();
  }, [getFavoriteMovies]);

  if (loading && !favoriteMovies.length) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-light dark:border-accent-dark border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Favorites</h1>
      
      {favoriteMovies.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Start adding movies to your favorites list!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
