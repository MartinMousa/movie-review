import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { searchMovies, searchResults, loading, error, hasMore, loadMoreSearchResults } = useMovies();

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query, searchMovies]);

  if (loading && !searchResults.length) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-light dark:border-accent-dark border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Search Results for "{query}"
        {searchResults.length > 0 && ` (${searchResults.length})`}
      </h1>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={loadMoreSearchResults}
                disabled={loading}
                className="px-6 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
