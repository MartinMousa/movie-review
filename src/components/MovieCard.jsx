import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie }) {
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovies();
  const isFavorite = favorites.includes(movie.id);
  const isWatchlisted = watchlist.includes(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie.id);
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    toggleWatchlist(movie.id);
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.thumbnailUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="flex items-center bg-black/70 rounded-full px-2 py-1">
            <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
            <span className="text-white text-xs font-medium">
              {movie.rating.toFixed(1)}
            </span>
          </div>
          <button
            onClick={handleFavoriteClick}
            className="p-1 rounded-full bg-black/70 hover:bg-black/80 transition-colors"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartOutline className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={handleWatchlistClick}
            className="p-1 rounded-full bg-black/70 hover:bg-black/80 transition-colors"
            title={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}
          >
            {isWatchlisted ? (
              <BookmarkIcon className="w-4 h-4 text-accent-light dark:text-accent-dark" />
            ) : (
              <BookmarkOutline className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-2">
        <h3 className="font-medium text-sm truncate">{movie.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs">
          {movie.releaseYear || 'Coming Soon'}
        </p>
      </div>
    </Link>
  );
}
