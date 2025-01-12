import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import MovieFilters from '../components/MovieFilters';
import MovieSlider from '../components/MovieSlider';

export default function Home() {
  const { 
    movies, 
    loading, 
    error, 
    loadMoreMovies, 
    hasMore 
  } = useMovies();

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MovieSlider />
      
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <MovieFilters />
          </div>
          
          <div className="md:w-3/4">
            {loading && movies.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-light dark:border-accent-dark border-t-transparent"></div>
              </div>
            ) : (
              <>
                {movies.length === 0 ? (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold">No movies found</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Try adjusting your filters or sorting options
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {movies.map(movie => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}

                {loading && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-accent-light dark:border-accent-dark border-t-transparent inline-block"></div>
                  </div>
                )}

                {!loading && hasMore && (
                  <div className="text-center py-6">
                    <button
                      onClick={loadMoreMovies}
                      className="px-6 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
