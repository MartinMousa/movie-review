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
      className="group card overflow-hidden"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={movie.thumbnailUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
            <div className="flex items-center gap-2 text-white mb-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFavoriteClick}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? (
                  <HeartIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartOutline className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={handleWatchlistClick}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                {isWatchlisted ? (
                  <BookmarkIcon className="w-5 h-5 text-accent" />
                ) : (
                  <BookmarkOutline className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-accent transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {movie.releaseYear || 'Coming Soon'}
        </p>
      </div>
    </Link>
  );
}
