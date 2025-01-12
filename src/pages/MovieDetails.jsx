import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { useMovies } from '../context/MovieContext';
import { movieApi } from '../services/movieApi';
import ReviewSection from '../components/ReviewSection';

export default function MovieDetails() {
  const { id } = useParams();
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovies();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isFavorite = favorites.includes(Number(id));
  const isWatchlisted = watchlist.includes(Number(id));

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieApi.getMovieDetails(id);
        setMovie(movieApi.formatMovieData(data));
      } catch (err) {
        setError('Failed to load movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-light dark:border-accent-dark border-t-transparent"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-500">
          {error || 'Movie not found'}
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Movie Header */}
      <div className="relative h-[50vh] min-h-[300px]">
        <img
          src={movie.backdropUrl || movie.thumbnailUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-medium">{movie.rating.toFixed(1)}</span>
            </div>
            <span>{movie.releaseYear}</span>
            {movie.duration && <span>{movie.duration}</span>}
          </div>
        </div>
      </div>

      {/* Movie Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              {isFavorite ? (
                <>
                  <HeartIcon className="w-5 h-5 text-red-500" />
                  <span>Remove from Favorites</span>
                </>
              ) : (
                <>
                  <HeartOutline className="w-5 h-5" />
                  <span>Add to Favorites</span>
                </>
              )}
            </button>
            <button
              onClick={() => toggleWatchlist(movie.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              {isWatchlisted ? (
                <>
                  <BookmarkIcon className="w-5 h-5 text-accent-light dark:text-accent-dark" />
                  <span>Remove from Watchlist</span>
                </>
              ) : (
                <>
                  <BookmarkOutline className="w-5 h-5" />
                  <span>Add to Watchlist</span>
                </>
              )}
            </button>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {movie.description}
            </p>
          </div>

          {/* Trailer */}
          {movie.trailerUrl && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Trailer</h2>
              <div className="aspect-video">
                <iframe
                  src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <ReviewSection movieId={movie.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Movie Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">Director</h3>
              <p>{movie.director || 'Unknown'}</p>
            </div>
            
            {movie.cast?.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Cast</h3>
                <div className="space-y-1">
                  {movie.cast.map((actor, index) => (
                    <p key={index}>{actor}</p>
                  ))}
                </div>
              </div>
            )}

            {movie.genre?.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
