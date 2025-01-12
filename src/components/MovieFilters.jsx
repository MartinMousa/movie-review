import React from 'react';
import { useMovies } from '../context/MovieContext';

export default function MovieFilters() {
  const { 
    genres,
    pendingFilters,
    updatePendingFilters,
    applyFilters,
    resetFilters,
    sortOptions
  } = useMovies();

  const handleGenreToggle = (genreName) => {
    updatePendingFilters({
      genres: pendingFilters.genres.includes(genreName)
        ? pendingFilters.genres.filter(g => g !== genreName)
        : [...pendingFilters.genres, genreName]
    });
  };

  const handleHideUnreleasedToggle = () => {
    updatePendingFilters({
      hideUnreleased: !pendingFilters.hideUnreleased
    });
  };

  const handleSortChange = (value) => {
    updatePendingFilters({
      sortOption: value
    });
  };

  return (
    <div className="space-y-4 p-4 bg-secondary-light dark:bg-secondary-dark rounded-lg">
      <h2 className="text-xl font-semibold">Filters</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Sort By</h3>
          <select
            value={pendingFilters.sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
          >
            {Object.entries(sortOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {genres?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.name)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    pendingFilters.genres.includes(genre.name)
                      ? 'bg-accent-light dark:bg-accent-dark text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="hideUnreleased"
            checked={pendingFilters.hideUnreleased}
            onChange={handleHideUnreleasedToggle}
            className="w-4 h-4 text-accent-light dark:text-accent-dark rounded focus:ring-accent-light dark:focus:ring-accent-dark"
          />
          <label htmlFor="hideUnreleased" className="text-sm">
            Hide unreleased movies
          </label>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={applyFilters}
            className="flex-1 px-3 py-1.5 bg-accent-light dark:bg-accent-dark text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
          
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
